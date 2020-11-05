class Product < ApplicationRecord
  belongs_to :category
  has_many :product_details, dependent: :destroy
  has_many :details, through: :product_details
  has_many :order_products
  has_many :orders, through: :order_products
end
