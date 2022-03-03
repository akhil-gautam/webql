# frozen_string_literal: true

class AddDeletedAtToApps < ActiveRecord::Migration[7.0]
  def change
    add_column :apps, :deleted_at, :datetime
    add_index :apps, :deleted_at
  end
end
