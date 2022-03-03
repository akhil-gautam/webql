# frozen_string_literal: true

class AuthenticationsController < ApplicationController
  skip_before_action :authorize_request

  # POST /auth/login
  def login
    user = User.find_by(email: login_params[:email])
    if user&.authenticate(login_params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      time = Time.zone.now + 100.hours
      render json: {
        token: token,
        exp: time,
        email: user.email,
        message: "Signed In!"
      }
    else
      render json: { errors: "Email or password is incorrect!" }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:user).permit(:email, :password)
  end
end
