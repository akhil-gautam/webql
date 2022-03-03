# frozen_string_literal: true

class CreateApps < ActiveRecord::Migration[7.0]
  def change
    create_table :apps, id: :uuid do |t|
      t.string :name
      t.integer :status
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid
      t.belongs_to :data_source, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
