json.extract!(
  product, :id, :name, :description, :price, :stock_quantity, :discount, :created_at, :updated_at
)
json.category product.category

details = {}
product.product_details.each do |d|
  details[d.detail.name.parameterize.underscore] = d.value
end

json.details details

# Expose products image url
json.image url_for(product.image)
# puts product["name"] + product["id"].to_s if !product.image.variable?
if product.image.variable?
  json.thumbnail rails_representation_url(product.image.variant(resize: "300x300").processed, only_path: true)
end

json.url product_url(product, only_path: true, format: :json)
