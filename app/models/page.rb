# frozen_string_literal: true

class Page < ApplicationRecord
  acts_as_paranoid

  belongs_to :app
  has_one :data_source, through: :app
  has_many :components, dependent: :destroy

  validates :name, presence: true
  validates :page_order, presence: true
  validates :page_order, uniqueness: { scope: :app_id }

  default_scope { order(page_order: :asc) }

  delegate :user, to: :app
end
