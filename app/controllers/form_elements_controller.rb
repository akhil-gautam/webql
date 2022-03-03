# frozen_string_literal: true

class FormElementsController < ApplicationController
  before_action :set_form_element, only: %i[show update destroy]

  # GET /form_elements
  # GET /form_elements.json
  def index
    @form_elements = FormElement.all
  end

  # GET /form_elements/1
  # GET /form_elements/1.json
  def show; end

  # POST /form_elements
  # POST /form_elements.json
  def create
    @form_element = FormElement.new(form_element_params)

    if @form_element.save
      render json: { message: "Success!" }, status: :ok
    else
      render json: @form_element.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /form_elements/1
  # PATCH/PUT /form_elements/1.json
  def update
    if @form_element.update(form_element_params)
      render json: @form_element, status: :ok
    else
      render json: @form_element.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /form_elements/1
  # DELETE /form_elements/1.json
  def destroy
    @form_element.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_form_element
    @form_element = FormElement.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def form_element_params
    params.require(:form_element).permit!
  end
end
