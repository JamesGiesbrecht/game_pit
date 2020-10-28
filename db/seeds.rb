# frozen_string_literal: true

require "json"

Category.destroy_all
Product.destroy_all

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
  product.save
end
pp Product.take(2)
pp Category.take(2)
