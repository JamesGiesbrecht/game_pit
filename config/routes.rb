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

  get "*path", to: "application#fallback_index_html", constraints: lambda { |req|
    req.path.exclude? "rails/active_storage"
  } do
    !req.xhr? && req.format.html?
  end
end
