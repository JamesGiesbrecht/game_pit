# frozen_string_literal: true

require "json"
require "open-uri"

OrderProduct.destroy_all
Order.destroy_all
ProductDetail.destroy_all
Product.destroy_all
Category.destroy_all
Detail.destroy_all
OrderStatus.destroy_all
Address.destroy_all
Customer.destroy_all
Province.destroy_all
TaxType.destroy_all
AdminUser.destroy_all
Page.destroy_all

# if Rails.env.development?
AdminUser.create!(
  email:                 "admin@example.com",
  password:              "password",
  password_confirmation: "password"
)
# end

products = JSON.parse(File.read(Rails.root.join("db/data/scripts/bb.json")))
tax_types = JSON.parse(File.read(Rails.root.join("db/data/tax_types.json")))
order_statuses = JSON.parse(File.read(Rails.root.join("db/data/order_statuses.json")))
provinces = JSON.parse(File.read(Rails.root.join("db/data/provinces.json")))
# customers = JSON.parse(File.read(Rails.root.join("db/data/customers.json")))
video_games = JSON.parse(File.read(Rails.root.join("db/data/video_games.json")))
pages = JSON.parse(File.read(Rails.root.join("db/data/pages.json")))

def add_detail(product, detail, value)
  detail_type = Detail.find_or_create_by(name: detail)
  ProductDetail.create(
    product: product,
    detail:  detail_type,
    value:   value
  )
end

# Pages
pages.each do |page|
  Page.create(
    title:     page["title"],
    content:   page["content"],
    permalink: page["permalink"]
  )
end

# Controllers/Consoles from JSON
# products.each do |p|
#   category = Category.find_or_create_by(name: p["category"])
#   product = Product.new(
#     name:           p["name"],
#     description:    p["description"],
#     price:          p["price"],
#     stock_quantity: p["stock_quantity"],
#     discount:       p["discount"],
#     category:       category
#   )
#   color = ""
#   p["details"].each do |d|
#     color = d[1] if d[0] === "Colour"
#     add_detail(product, d[0], d[1])
#   end
#   image = open("data/images/#{p['imgUrl']}")
#   product.image.attach(io: image, filename: "#{product['name'].gsub(' ', '_')}_#{color.gsub(' ', '_')}")
#   product.save
# end

products_count = products.count

# Importing Products scraped from best buy
products.each_with_index do |p, index|
  puts "Seeding Product #{index + 1} of #{products_count} - #{p['name']}"
  category = Category.find_or_create_by(name: p["category"])
  product = Product.new(
    name:           p["name"],
    description:    p["description"],
    price:          p["price"],
    stock_quantity: Faker::Number.between(from: 0, to: 30),
    discount:       rand >= 0.9 ? (Faker::Number.between(from: 5, to: 50).to_f / 100).round(2) : 0,
    category:       category
  )
  color = ""
  p["details"].each do |d|
    color = d[1] if d[0] === "Colour"
    add_detail(product, d[0], d[1])
  end
  filename = "#{product['name'].gsub(' ', '_')}_#{color.gsub(' ', '_')}.jpg"
  begin
    image = open(Rails.root.join("db/data/images/#{filename.gsub(':', '-')}"))
  rescue => e
    puts e
    image = open(p["image"])
  end
  product.image.attach(io: image, filename: filename)
  product.save
end

# Video Games entries from dataset
video_games_cat = Category.find_or_create_by(name: "Video Games")
game_count = video_games.count

video_games.each_with_index do |v, index|
  price_range = case v["year"]
                when 2020
                  [6000, 9000]
                when 2019
                  [5000, 8000]
                when 2018
                  [4000, 7000]
                when 2017
                  [3000, 6000]
                when 2016
                  [2000, 5000]
                else
                  [1000, 5000]
                end
  puts "Seeding Game #{index + 1} of #{game_count} - #{v['name']}"
  game = Product.new(
    name:           v["name"],
    description:    "#{v['platform']} game developed by #{v['developer']}",
    price:          (Faker::Number.between(from: price_range[0], to: price_range[1]).to_f / 100).round(2),
    stock_quantity: Faker::Number.between(from: 0, to: 30),
    discount:       rand >= 0.9 ? (Faker::Number.between(from: 5, to: 50).to_f / 100).round(2) : 0,
    category:       video_games_cat
  )
  add_detail(game, "Genre", v["genre"])
  add_detail(game, "ESRB Rating", v["esrbRating"])
  add_detail(game, "Platform", v["platform"])
  add_detail(game, "Publisher", v["publisher"])
  add_detail(game, "Developer", v["developer"])
  add_detail(game, "Critic Score", v["criticScore"])
  add_detail(game, "User Score", v["userScore"])
  uri = URI.parse(v["imgUrl"])
  tries = 3
  filename = "#{v['name'].gsub(' ', '_')}_#{v['platform'].gsub(' ', '_')}.jpg"
  begin
    image = open(Rails.root.join("db/data/images/#{filename.gsub(':', '-')}"))
  rescue => e
    puts e
    begin
      image = uri.open(redirect: false)
    rescue OpenURI::HTTPRedirect => redirect
      uri = redirect.uri # assigned from the "Location" response header
      retry if (tries -= 1) > 0
      raise
    end
  end
  game.image.attach(io: image, filename: filename)
  game.save
end

# Tax Types from JSON
tax_types.each do |t|
  TaxType.create(name: t)
end

# Order Statuses from JSON
order_statuses.each do |o|
  OrderStatus.create(name: o)
end

# Provinces from JSON
provinces.each do |p|
  tax_type = TaxType.find_by(name: p["salesTax"]["type"])
  Province.create(
    name:     p["name"],
    gst:      p["salesTax"]["GST"],
    pst:      p["salesTax"][p["salesTax"]["type"]],
    tax_type: tax_type
  )
end

# Generating 100 customers with 1-3 addresses
100.times do
  customer = Customer.new(
    first_name: Faker::Name.first_name,
    last_name:  Faker::Name.last_name,
    phone:      Faker::Number.number(digits: 10),
    email:      Faker::Internet.email,
    password:   "password"
  )

  rand(1..3).times do
    province_offset = rand(Province.count)
    province = Province.offset(province_offset).first
    Address.create(
      address:  Faker::Address.street_address,
      city:     Faker::Address.city,
      province: province,
      customer: customer
    )
  end
  customer.save
end

200.times do
  address_offset = rand(Address.count)
  order_status_offset = rand(OrderStatus.count)
  address = Address.offset(address_offset).first
  order_status = OrderStatus.offset(order_status_offset).first
  order = Order.new(
    order_date:   Faker::Date.between(from: 3.years.ago, to: Time.zone.today),
    address:      address,
    gst:          address.province.gst,
    pst:          address.province.pst,
    order_status: order_status
  )

  rand(1..5).times do
    product_offset = rand(Product.count)
    product = Product.offset(product_offset).first
    OrderProduct.create(
      order:    order,
      product:  product,
      quantity: rand(1..3),
      price:    product.price - product.discount * product.price
    )
  end
end

# Product.take(3)[2].product_details.each do |d|
#   puts "#{d.detail.name}: #{d.value}"
# end
# # pp Category.take(2)
# pp OrderStatus.take(2)
# pp TaxType.take(2)
# pp Province.take(3)
# pp Customer.take(2)
# pp Customer.first.addresses
