json.extract! product, :id, :name, :description, :category_id, :price, :stock_quantity, :discount, :image, :created_at, :updated_at
json.url product_url(product, format: :json)





