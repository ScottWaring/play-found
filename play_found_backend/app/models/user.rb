class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: true, presence: true, length: {minimum: 5}
  validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, presence: true, length: {minimum: 2}
  validates :last_name, presence: true, length: {minimum: 2}
end
