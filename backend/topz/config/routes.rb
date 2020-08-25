Rails.application.routes.draw do
  resources :options, only: [:create, :update, :destroy]
  resources :tops, only: [:index, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
