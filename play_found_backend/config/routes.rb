Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
      post '/addplayground', to: 'cached_playground#create'
      delete '/delete_playground', to: "cached_playground#destroy"
      patch '/edit_playground', to: "cached_playground#update"
      post '/addbathroom', to: 'bathroom#create'
      put '/getlocalbathrooms', to: 'bathroom#find_local_bathrooms'
      delete '/delete_bathroom', to: "bathroom#destroy"
      post '/addreview', to: 'review#create'
      put '/getreviews', to: 'review#find'
      delete '/delete_review', to: "review#destroy"
      put '/usercontent', to: 'content#user_content'
      put '/getplayground', to: 'cached_playground#show'
    end
  end


  post '/search', to: 'search#create'
  put '/search/place', to: 'search#find_place'
end
