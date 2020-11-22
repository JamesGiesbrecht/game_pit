class Page < ApplicationRecord
  validates :title, :permalink, presence: true
end
