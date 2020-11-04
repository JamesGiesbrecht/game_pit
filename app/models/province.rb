class Province < ApplicationRecord
  belongs_to :tax_type, optional: true
end
