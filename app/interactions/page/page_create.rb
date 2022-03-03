# frozen_string_literal: true

class PageCreate < ActiveInteraction::Base
  string :app_id
  string :name
  integer :page_order

  validates :name, :app_id, :page_order, presence: true

  def execute
    Page.create!(name: name, page_order: page_order, app_id: app_id)
  end
end
