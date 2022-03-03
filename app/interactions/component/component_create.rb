# frozen_string_literal: true

class ComponentCreate < ActiveInteraction::Base
  string :page_id
  string :heading
  string :component_type
  string :component_query
  integer :component_order

  validates :page_id, :heading, :component_query, :component_order, :component_type, presence: true

  def execute
    Component.create!(
      page_id: page_id,
      heading: heading,
      component_query: component_query,
      component_order: component_order,
      component_type: component_type
    )
  end
end
