class Order < ApplicationRecord
  belongs_to :address
  belongs_to :order_status
end
