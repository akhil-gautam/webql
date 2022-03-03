# frozen_string_literal: true

class ComponentsController < ApplicationController
  skip_before_action :authorize_request, only: [:exec_query]
  before_action :set_component, only: %i[show update destroy exec_query archive]
  before_action :set_data_source, only: [:exec_query]

  # GET /components
  # GET /components.json
  def index
    @components = Component.all
  end

  def exec_query
    outcome = ComponentQuery.run({ data_source: @data_source, component: @component })
    if outcome.valid?
      render json: { result: outcome.result }, status: :ok
    else
      render json: { errors: outcome.errors.full_messages.join(" and ") },
             status: :unprocessable_entity
    end
  end

  # GET /components/1
  # GET /components/1.json
  def show; end

  # POST /components
  # POST /components.json
  def create
    component = Component.new(component_params)

    if component.save
      render json: { component: component }, status: :created
    else
      render json: component.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /components/1
  # PATCH/PUT /components/1.json
  def update
    if @component.update(component_params)
      render json: { message: "Success!" }, status: :ok
    else
      render json: @component.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /components/1
  # DELETE /components/1.json
  def destroy
    @component.destroy
  end

  def archive
    return unless @component.user.id == @current_user.id

    @component.destroy
    render json: { message: "Success!" }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_component
    @component = Component.find(params[:id])
  end

  def set_data_source
    @data_source = @component.data_source
  end

  # Only allow a list of trusted parameters through.
  def component_params
    params.require(:component).permit!
  end
end
