# frozen_string_literal: true

class PostgresQuery < ActiveInteraction::Base
  object :data_source, class: DataSource
  string :db_query

  validates :db_query, :data_source, presence: true

  def execute
    ActiveRecord::Base.transaction do
      if data_source.settings["password"].present?
        locker_id = data_source.settings.delete("password")
        password = Locker.find(locker_id).enkrypted
      else
        password = ""
      end
      connection = PG.connect(data_source.settings.merge({ password: password }))
      connection.exec(db_query).to_a
    end
  end
end
