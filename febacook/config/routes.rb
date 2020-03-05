Rails.application.routes.draw do
  namespace :api do
    get 'session/create'
    get 'session/destroy'
  end
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :update, :show, :index]
    resource :session
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
