# frozen_string_literal: true

class MysqlQuery < ActiveInteraction::Base
  object :data_source, class: DataSource
  string :db_query

  validates :db_query, :data_source, presence: true

  def execute
    ActiveRecord::Base.transaction do
      username = data_source.settings.delete("user")
      if data_source.settings["password"].present?
        locker_id = data_source.settings.delete("password")
        password = Locker.find(locker_id).enkrypted
      else
        password = ""
      end
      connection = Mysql2::Client.new(data_source.settings.merge({ username: username, password: password }))
      connection.query(db_query).to_a
    end
  end
end
