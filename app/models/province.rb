class Province < ApplicationRecord
  belongs_to :tax_type, optional: true
  has_many :addresses, dependent: :destroy

  validates :name, presence: true
  validates :gst, :pst, numericality: true
end
