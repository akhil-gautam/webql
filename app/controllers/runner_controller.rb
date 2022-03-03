# frozen_string_literal: true

class RunnerController < ApplicationController
  skip_before_action :authorize_request

  def app_data
    set_app
    validate_app_status
    render json: { app: @app, pages: @app.pages }, status: :ok
  end

  private

  def set_app
    @app = App.includes(:pages).where(id: params[:app_id]).order("pages.page_order").first
    raise ActiveRecord::RecordNotFound if @app.nil?
  end

  def validate_app_status
    return unless @app.private_app?

    authorize_request
    # in case user is authorized but is trying to access someone else's app_id
    raise UnauthorizedError if @current_user.nil? || @app.user.id != @current_user.id
  end
end
