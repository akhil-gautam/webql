# frozen_string_literal: true

json.array! @apps, partial: "apps/app", as: :app
