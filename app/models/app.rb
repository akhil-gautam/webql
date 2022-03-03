# frozen_string_literal: true

class App < ApplicationRecord
  acts_as_paranoid

  enum status: { "private_app" => 0, "public_app" => 1 }, _default: "private_app"

  validates :status, presence: true
  validates :name, uniqueness: true

  belongs_to :data_source
  belongs_to :user
  has_many :pages, dependent: :destroy
  has_many :forms, dependent: :destroy
end
