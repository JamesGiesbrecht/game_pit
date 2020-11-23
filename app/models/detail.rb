class Detail < ApplicationRecord
  has_many :product_details, dependent: :destroy
  has_many :products, through: :product_details

  validates :name, presence: true
end
