Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  constraints ->(request) { request.format == :json } do
    resources :categories, path: "/api/categories"
    resources :products, path: "/api/products"
    resources :pages, path: "/api/pages"
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
