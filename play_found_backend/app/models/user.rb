class User < ApplicationRecord
  has_secure_password
  has_many :reviews
  has_many :cached_playgrounds
  has_many :bathrooms
  validates :username, uniqueness: true, presence: true, length: {minimum: 5}
  validates :email, uniqueness: true, presence: true
  validates :first_name, presence: true, length: {minimum: 2}
  validates :last_name, presence: true, length: {minimum: 2}
end


# , format: { with: URI::MailTo::EMAIL_REGEXP }
