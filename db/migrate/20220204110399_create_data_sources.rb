# frozen_string_literal: true

class CreateDataSources < ActiveRecord::Migration[7.0]
  def change
    create_table :data_sources, id: :uuid do |t|
      t.integer :source
      t.jsonb :settings
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
