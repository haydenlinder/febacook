Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do 
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy, :update]
    resources :users, only: [:create, :update, :index]
    resources :friendships, only: [:create, :show, :update, :index, :destroy]
    resources :posts, only: [:create, :show, :update, :destroy]
    get 'users/:username', to: 'users#show', as: 'username'
    get 'users:q=:v', to: 'users#index'
    resource :session
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
