# frozen_string_literal: true

class AddUniqueIndexToRecords < ActiveRecord::Migration[7.0]
  def change
    add_index :users, [:email], unique: true
    add_index :apps, [:name], unique: true
    add_index :components, %i[component_order page_id], unique: true
    add_index :form_elements, %i[field_order form_id], unique: true
    add_index :pages, %i[page_order app_id], unique: true
  end
end
