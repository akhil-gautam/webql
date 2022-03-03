# frozen_string_literal: true

class Component < ApplicationRecord
  acts_as_paranoid
  enum component_type: { "datatable" => 0, "cards_list" => 1, "chart" => 2, "detail" => 3 }

  belongs_to :page
  has_one :data_source, through: :page

  validates :component_type, presence: true
  validates :component_query, presence: true
  validates :component_order, uniqueness: { scope: :page_id }, presence: true

  default_scope { order(component_order: :asc) }

  delegate :user, to: :page
end
