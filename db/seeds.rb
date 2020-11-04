# frozen_string_literal: true

require "json"

ProductDetail.destroy_all
Product.destroy_all
Category.destroy_all
Detail.destroy_all
OrderStatus.destroy_all
Province.destroy_all
TaxType.destroy_all

products = JSON.parse(File.read(Rails.root.join("db/data/products.json")))
tax_types = JSON.parse(File.read(Rails.root.join("db/data/tax_types.json")))
order_statuses = JSON.parse(File.read(Rails.root.join("db/data/order_statuses.json")))
provinces = JSON.parse(File.read(Rails.root.join("db/data/provinces.json")))

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

tax_types.each do |t|
  TaxType.create(name: t)
end

order_statuses.each do |o|
  OrderStatus.create(name: o)
end

provinces.each do |p|
  tax_type = TaxType.find_by(name: p["salesTax"]["type"])
  pp tax_type
  Province.create(
    name:     p["name"],
    gst:      p["salesTax"]["GST"],
    pst:      p["salesTax"][p["salesTax"]["type"]],
    tax_type: tax_type
  )
end

# Product.take(3)[2].product_details.each do |d|
#   puts "#{d.detail.name}: #{d.value}"
# end
# # pp Category.take(2)
pp OrderStatus.take(2)
pp TaxType.take(2)
pp Province.take(3)
