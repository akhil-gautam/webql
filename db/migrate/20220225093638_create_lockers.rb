# frozen_string_literal: true

class CreateLockers < ActiveRecord::Migration[7.0]
  def change
    create_table :lockers, id: :uuid do |t|
      t.text :enkrypted_ciphertext

      t.timestamps
    end
  end
end
