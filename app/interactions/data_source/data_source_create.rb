# frozen_string_literal: true

class DataSourceCreate < ActiveInteraction::Base
  hash :settings, strip: false
  string :user_id
  string :source

  validates :user_id, :source, presence: true

  def execute
    ActiveRecord::Base.transaction do
      if settings[:password].present?
        enkrypted = compose(
          LockerCreate,
          enkrypted: settings[:password]
        )
        settings[:password] = enkrypted.id
      end
      DataSource.create!(settings: settings, user_id: user_id, source: source)
    end
  end
end
