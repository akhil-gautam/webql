# frozen_string_literal: true

class QueriesController < ApplicationController
  before_action :set_data_source

  def run
    outcome = QueryTest.run(
      params.slice(:data_source_query).merge(data_source: @data_source)
    )

    if outcome.valid?
      render json: { result: outcome.result }, status: :ok
    else
      render json: { errors: outcome.errors.full_messages.join(" and ") },
             status: :unprocessable_entity
    end
  end

  private

  def set_data_source
    @data_source = DataSource.find(params[:data_source_id])
  end
end
