# frozen_string_literal: true

class AppCreate < ActiveInteraction::Base
  string :data_source_id
  string :name
  string :user_id

  validates :data_source_id, :name, :user_id, presence: true

  def execute
    App.create!(name: name, data_source_id: data_source_id, user_id: user_id)
  end
end
