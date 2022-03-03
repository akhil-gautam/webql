# frozen_string_literal: true

class ApplicationController < ActionController::API
  before_action :authorize_request, except: [:time]
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from UnauthorizedError, with: :unauthorized_access

  def authorize_request
    header = request.headers["Authorization"]
    header = header.split(" ").last if header
    raise UnauthorizedError unless header

    begin
      decoded = JsonWebToken.decode(header)
      @current_user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound
      raise UnauthorizedError
    rescue JWT::DecodeError
      render json: { errors: "Session expired. Please login again!" }, status: :unauthorized
    end
  end

  def time
    render json: { time: DateTime.now }
  end

  private

  def record_not_found
    render json: { message: "Record not found!" }, status: :unprocessable_entity
  end

  def unauthorized_access
    render json: { message: "Unauthorized access!" }, status: :unprocessable_entity
  end
end
