# frozen_string_literal: true

class ComponentQuery < ActiveInteraction::Base
  object :data_source, class: DataSource
  object :component, class: Component

  validates :component, :data_source, presence: true

  def execute
    compose(
      "#{data_source.source}_query".camelize.constantize,
      data_source: data_source,
      db_query: component.component_query
    )
  rescue => e
    errors.add(:db, e.message)
  end
end
