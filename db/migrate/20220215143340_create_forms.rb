# frozen_string_literal: true

class CreateForms < ActiveRecord::Migration[7.0]
  def change
    create_table :forms, id: :uuid do |t|
      t.string :title
      t.belongs_to :app, null: false, foreign_key: true, type: :uuid
      t.integer :status
      t.text :form_query

      t.timestamps
    end
  end
end
