class TaxType < ApplicationRecord
  has_many :provinces, dependent: :nullify

  validates :name, presence: true
end
