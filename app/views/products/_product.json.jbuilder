json.extract! product, :id, :name, :description, :price, :stock_quantity, :discount, :created_at, :updated_at
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
  # TODO: add .processed when settled on a size
  json.thumbnail rails_representation_url(product.image.variant(resize: "100x100"), only_path: true)
  # json.thumbnail rails_representation_url(product.image.variant(resize: "100x100").processed, only_path: true)
end

json.url product_url(product, format: :json)
