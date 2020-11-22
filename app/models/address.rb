class Address < ApplicationRecord
  belongs_to :province
  belongs_to :customer
  has_many :orders, dependent: :destroy

  validates :addressm, :city, presence: true
end
