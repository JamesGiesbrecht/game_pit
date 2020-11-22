class Order < ApplicationRecord
  belongs_to :address
  belongs_to :order_status
  has_one :customer, through: :address
  has_many :order_products, dependent: :destroy
  has_many :products, through: :order_products

  validates :order_date, presence: true
  validates :gst, :pst, numericality: true
end
