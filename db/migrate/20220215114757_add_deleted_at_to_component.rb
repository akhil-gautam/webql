# frozen_string_literal: true

class AddDeletedAtToComponent < ActiveRecord::Migration[7.0]
  def change
    add_column :components, :deleted_at, :datetime
    add_index :components, :deleted_at
  end
end
