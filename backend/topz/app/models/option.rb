class Option < ApplicationRecord
  validates :content, presence: true
  belongs_to :top
end
