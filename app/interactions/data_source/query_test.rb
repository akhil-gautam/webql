# frozen_string_literal: true

class QueryTest < ActiveInteraction::Base
  string :data_source_query
  object :data_source, class: DataSource

  validates :data_source_query, :data_source, presence: true

  def execute
    compose(
      "#{data_source.source}_query".camelize.constantize,
      data_source: data_source,
      db_query: data_source_query
    )
  rescue => e
    errors.add(:db, e.message)
  end
end
