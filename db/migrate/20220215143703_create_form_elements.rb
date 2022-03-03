# frozen_string_literal: true

class CreateFormElements < ActiveRecord::Migration[7.0]
  def change
    create_table :form_elements, id: :uuid do |t|
      t.string :label
      t.belongs_to :form, null: false, foreign_key: true, type: :uuid
      t.integer :field_order, null: false
      t.string :field_type, null: false
      t.boolean :required
      t.jsonb :settings
      t.string :db_column, null: false
      t.string :helper_text
      t.string :placeholder, default: ""

      t.timestamps
    end
  end
end
