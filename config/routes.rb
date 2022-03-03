# frozen_string_literal: true

Rails.application.routes.draw do
  resources :form_elements
  resources :forms do
    post :exec_query, on: :member
    get :form_elements, on: :member
  end

  resources :users, only: [:create]

  resources :components do
    get :exec_query, on: :member
    patch :archive, on: :member
  end

  resources :data_sources, only: %i[index create update] do
    post :auto_create_pages, on: :member
  end

  resources :pages do
    get :components, on: :member
    patch :archive, on: :member
  end

  resources :apps, only: %i[create show index update] do
    get :pages, on: :member
    get :forms, on: :member
    patch :archive, on: :member
  end

  resources :builders, only: [:index]
  resources :queries, only: [] do
    post :run, on: :collection
  end

  resources :archives, only: %i[index destroy] do
    put :restore, on: :member
  end

  # routes to run the application
  get "runner/:app_id/app_data", to: "runner#app_data"
  get "runner/:component_id/exec_query", to: "runner#exec_query"

  post "auth/login", to: "authentications#login"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
