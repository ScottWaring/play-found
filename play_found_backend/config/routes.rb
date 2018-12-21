Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      post '/addplayground', to: 'cached_playground#create'
      post '/addbathroom', to: 'bathroom#create'
      post '/addreview', to: 'review#create'
    end
  end

  post '/search', to: 'search#create'
  put '/search/place', to: 'search#find_place'
end
