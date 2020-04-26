Rails.application.routes.draw do

  namespace :api do
    get 'posts/create'
    get 'posts/show'
    get 'posts/update'
    get 'posts/destroy'
  end
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :update, :index]
    resources :posts, only: [:create, :show, :udpate, :destroy]
    get 'users/:username', to: 'users#show', as: 'username'
    get 'users:q=:v', to: 'users#index'
    resource :session
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
