# frozen_string_literal: true

class CreateComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :components, id: :uuid do |t|
      t.string :heading
      t.integer :component_order
      t.integer :component_type
      t.text :component_query
      t.belongs_to :page, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
