# frozen_string_literal: true

class AddSettingsToComponents < ActiveRecord::Migration[7.0]
  def change
    add_column :components, :settings, :jsonb, default: {}
  end
end
