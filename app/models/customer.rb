class Customer < ApplicationRecord
  has_many :addresses, dependent: :destroy
  has_many :orders, through: :addresses
end
