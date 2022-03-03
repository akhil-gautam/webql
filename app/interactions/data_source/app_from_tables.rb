# frozen_string_literal: true

class AppFromTables < ActiveInteraction::Base
  DS_TABLES_QUERY = {
    mysql: "SHOW TABLES;",
    postgres: "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');"
  }.freeze

  object :data_source, class: DataSource
  object :user, class: User

  validates :data_source, :user, presence: true

  validate :ownership

  def execute
    ActiveRecord::Base.transaction do
      tables = compose(
        "#{data_source.source}_query".camelize.constantize,
        data_source: data_source,
        db_query: DS_TABLES_QUERY[data_source.source.to_sym]
      ).map(&:values).flatten

      app_name = "#{data_source.source}_#{DateTime.now.to_formatted_s(:short)}_auto"
      app = compose(
        AppCreate, name: app_name,
                   data_source_id: data_source.id, user_id: user.id
      )
      tables.each_with_index do |table, index|
        page = compose(
          PageCreate,
          name: table,
          app_id: app.id,
          page_order: index
        )
        compose(
          ComponentCreate,
          page_id: page.id,
          heading: table.humanize,
          component_query: "SELECT * FROM #{table};",
          component_order: 0,
          component_type: "datatable",
          settings: { row_click_enabled: true }
        )
      end
    end
  end

  def ownership
    inputs[:data_source].user_id != user.id && errors.add(:user, "You are not authorized!!")
  end
end
