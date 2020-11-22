class OrderProduct < ApplicationRecord
  belongs_to :order
  belongs_to :product

  validates :price, :quantity, presence: true
  validates :price, numericality: true
  validates :quantity, numericality: { only_integer: true }
end
