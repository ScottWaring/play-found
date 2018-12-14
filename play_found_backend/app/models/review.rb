class Review < ApplicationRecord
  belongs_to :user
  belongs_to :cached_playground
end
