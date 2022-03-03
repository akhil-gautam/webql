# frozen_string_literal: true

class CreatePages < ActiveRecord::Migration[7.0]
  def change
    create_table :pages, id: :uuid do |t|
      t.string :name
      t.integer :page_order
      t.belongs_to :app, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
