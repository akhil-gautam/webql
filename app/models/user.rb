# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :apps, dependent: :destroy
  has_many :pages, through: :apps
  has_many :components, through: :pages
  has_many :forms, through: :apps
  has_many :data_sources, dependent: :destroy

  validates :email, uniqueness: true, presence: true
end
