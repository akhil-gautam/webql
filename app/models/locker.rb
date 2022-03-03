# frozen_string_literal: true

class Locker < ApplicationRecord
  lockbox_encrypts :enkrypted
end
