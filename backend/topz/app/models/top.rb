class Top < ApplicationRecord
    validates :title, presence: true
    has_many :options
end
