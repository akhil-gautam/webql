# frozen_string_literal: true

json.array! @data_sources, partial: "data_sources/data_source", as: :data_source
