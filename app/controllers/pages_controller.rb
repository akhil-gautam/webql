# frozen_string_literal: true

class PagesController < ApplicationController
  skip_before_action :authorize_request, only: [:components]
  before_action :set_page, only: %i[show update destroy components archive]

  # GET /pages
  # GET /pages.json
  def index
    @pages = Page.all
  end

  def components
    @components = @page.components.order(:component_order)
  end

  # GET /pages/1
  # GET /pages/1.json
  def show; end

  # POST /pages
  # POST /pages.json
  def create
    page = Page.new(page_params)

    if page.save
      render json: { page: page }, status: :created
    else
      render json: page.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pages/1
  # PATCH/PUT /pages/1.json
  def update
    if @page.update(page_params)
      render json: { message: "Updated!" }, status: :ok
    else
      render json: @page.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.json
  def destroy
    @page.destroy
  end

  def archive
    return unless @page.user.id == @current_user.id

    @page.destroy
    render json: { message: "Success!" }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_page
    @page = Page.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def page_params
    params.require(:page).permit(:name, :page_order, :app_id)
  end
end
