class Province < ApplicationRecord
  belongs_to :tax_type, optional: true
  has_many :addresses, dependent: :destroy
end
