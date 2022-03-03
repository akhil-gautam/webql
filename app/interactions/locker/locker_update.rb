# frozen_string_literal: true

class LockerUpdate < ActiveInteraction::Base
  string :enkrypted
  string :locker_id

  validates :enkrypted, presence: true

  def execute
    locker = Locker.find(locker_id)
    locker.update!(enkrypted: enkrypted)
    locker
  end
end
