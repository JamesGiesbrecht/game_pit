# frozen_string_literal: true

require "json"

ProductDetail.destroy_all
Product.destroy_all
Category.destroy_all
Detail.destroy_all

products = JSON.parse(File.read(Rails.root.join("db/data/products.json")))

products.each do |p|
  category = Category.find_or_create_by(name: p["category"])
  product = Product.new(
    name:           p["name"],
    description:    p["description"],
    price:          p["price"],
    stock_quantity: p["stock_quantity"],
    discount:       p["discount"],
    category:       category
  )
  p["details"].each do |d|
    detail = Detail.find_or_create_by(name: d[0])
    ProductDetail.create(
      product: product,
      detail:  detail,
      value:   d[1]
    )
  end
  product.save
end
Product.take(3)[2].product_details.each do |d|
  puts "#{d.detail.name}: #{d.value}"
end
# pp Category.take(2)
