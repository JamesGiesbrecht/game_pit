class Customer < ApplicationRecord
  has_many :addresses, dependent: :destroy
  has_many :orders, through: :addresses

  validates :first_name, :last_name, presence: true
end
