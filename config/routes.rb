Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  constraints ->(request) { request.format == :json } do
    scope "/api" do
      resources :categories
      resources :products
      resources :pages
    end
  end

  # get "/download_attachments", to: "application#process_and_create_zip_file", as: "download_documents"

  get "*path", to: "application#fallback_index_html", constraints: lambda { |req|
    req.path.exclude? "rails/active_storage"
  } do
    !req.xhr? && req.format.html?
  end
end
