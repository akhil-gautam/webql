# frozen_string_literal: true

class AddDeletedAtToForm < ActiveRecord::Migration[7.0]
  def change
    add_column :forms, :deleted_at, :datetime
    add_index :forms, :deleted_at
  end
end
