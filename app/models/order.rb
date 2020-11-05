class Order < ApplicationRecord
  belongs_to :address
  belongs_to :order_status
  has_many :order_products, dependent: :destroy
  has_many :products, through: :order_products
end
