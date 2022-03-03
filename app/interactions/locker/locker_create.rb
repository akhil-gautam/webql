# frozen_string_literal: true

class LockerCreate < ActiveInteraction::Base
  string :enkrypted

  validates :enkrypted, presence: true

  def execute
    Locker.create!(enkrypted: enkrypted)
  end
end
