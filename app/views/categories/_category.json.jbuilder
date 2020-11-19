json.extract! category, :id, :name, :created_at, :updated_at
json.url category_url(category, format: :json)
if defined?(show_products)
  json.products category.products do |product|
    json.partial! "products/product", product: product
  end
end
