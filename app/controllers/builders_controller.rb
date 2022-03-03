# frozen_string_literal: true

class BuildersController < ApplicationController
  def index
    @data_sources = @current_user.data_sources
    @apps = @current_user.apps.where(status: %i[public_app private_app])
  end
end
