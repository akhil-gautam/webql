# frozen_string_literal: true

json.extract! page, :id, :name, :page_order, :app_id, :created_at, :updated_at
json.url page_url(page, format: :json)
