# frozen_string_literal: true

class UserVerificationMailer < ApplicationMailer
  default from: "akhilgautam123@gmail.com"

  # send a signup email to the user, pass in the user object that   contains the user's email address
  def send_verification_email(user)
    @user = user
    mail(to: @user.email,
         subject: "Please verify your email!")
  end
end
