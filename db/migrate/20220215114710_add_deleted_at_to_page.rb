# frozen_string_literal: true

class AddDeletedAtToPage < ActiveRecord::Migration[7.0]
  def change
    add_column :pages, :deleted_at, :datetime
    add_index :pages, :deleted_at
  end
end
