# frozen_string_literal: true

class AppsController < ApplicationController
  skip_before_action :authorize_request, only: %i[show pages forms]
  before_action :set_app, only: %i[show update destroy pages forms archive]

  # GET /apps
  # GET /apps.json
  def index
    @apps = App.all
  end

  def pages
    @pages = @app.pages.order(:page_order)
  end

  def forms
    @forms = @app.forms
  end

  # GET /apps/1
  # GET /apps/1.json
  def show; end

  # POST /apps
  # POST /apps.json
  def create
    @app = App.new(app_params.merge({ user_id: @current_user.id, status: "private_app" }))

    if @app.save
      render json: { message: "Created successfully!" }, status: :created
    else
      render json: @app.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /apps/1
  # PATCH/PUT /apps/1.json
  def update
    if @app.update(app_params)
      render json: { message: "Updated successfully!" }, status: :ok
    else
      render json: @app.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /apps/1
  # DELETE /apps/1.json
  def destroy
    @app.really_destroy!
  end

  def archive
    return unless @app.user.id == @current_user.id

    @app.destroy
    render json: { message: "Success!" }, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_app
    @app = App.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def app_params
    params.require(:app).permit(:name, :status, :data_source_id)
  end
end
