# frozen_string_literal: true

class DataSourceUpdate < ActiveInteraction::Base
  hash :settings, strip: false
  object :data_source, class: DataSource
  string :source

  validates :data_source, :source, presence: true

  def execute
    ActiveRecord::Base.transaction do
      if settings[:password].present?
        enkrypted = compose(
          LockerUpdate,
          locker_id: data_source.settings["password"],
          enkrypted: settings[:password]
        )
        settings[:password] = enkrypted.id
      end
      data_source.update!(settings: settings, source: source)
    end
  end
end
