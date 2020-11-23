json.extract! page, :id, :title, :content, :permalink, :created_at, :updated_at
json.url page_url(page, only_path: true, format: :json)
