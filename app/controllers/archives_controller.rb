# frozen_string_literal: true

class ArchivesController < ApplicationController
  def index
    apps = @current_user.apps.only_deleted
    pages = @current_user.pages.only_deleted
    components = @current_user.components.only_deleted
    forms = @current_user.forms.only_deleted
    render json: { apps: apps, pages: pages, components: components, forms: forms }, status: :ok
  end

  def restore
    if %w[app page component form].include? params[:type]
      params[:type].camelize.constantize.only_deleted.find(params[:id]).restore
    else
      render json: { message: "Invalid type" }, status: :unprocessable_entity
    end
  end

  def destroy
    if %w[app page component form].include? params[:type]
      params[:type].camelize.constantize.only_deleted.find(params[:id]).really_destroy!
    else
      render json: { message: "Invalid type" }, status: :unprocessable_entity
    end
  end
end
