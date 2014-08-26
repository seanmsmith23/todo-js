Rails.application.routes.draw do
  root :to => "home#show"

  resources :tasks, only: [:create, :update, :destroy]
end
