class TaxType < ApplicationRecord
  has_many :provinces, dependent: :nullify
end
