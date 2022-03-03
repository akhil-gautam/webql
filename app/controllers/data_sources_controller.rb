# frozen_string_literal: true

class DataSourcesController < ApplicationController
  before_action :set_data_source, only: %i[show update destroy auto_create_pages]

  # GET /data_sources
  # GET /data_sources.json
  def index
    @data_sources = @current_user.data_sources
  end

  # GET /data_sources/1
  # GET /data_sources/1.json
  def show; end

  # POST /data_sources
  # POST /data_sources.json
  def create
    outcome = DataSourceCreate.run(
      data_source_params.merge(user_id: @current_user.id)
    )
    if outcome.valid?
      render json: { result: outcome.result }, status: :created
    else
      render json: { errors: outcome.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def auto_create_pages
    AutoCreatePagesJob.perform_later @data_source, @current_user
    render json: { result: 'Queued for execution!' }, status: :ok
  end

  # PATCH/PUT /data_sources/1
  # PATCH/PUT /data_sources/1.json
  def update
    outcome = DataSourceUpdate.run(
      data_source_params.merge(data_source: @data_source)
    )
    if outcome.valid?
      render json: { result: outcome.result }, status: :created
    else
      render json: { errors: outcome.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /data_sources/1
  # DELETE /data_sources/1.json
  def destroy
    @data_source.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_data_source
    @data_source = DataSource.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def data_source_params
    params.require(:data_source).permit!
  end
end
