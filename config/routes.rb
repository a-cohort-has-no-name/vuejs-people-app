Rails.application.routes.draw do
  root to: 'people#index'

  namespace :api do
    namespace :v1 do
      get '/people' => 'people#index'
      post '/people' => 'people#create'
      get '/people/:id' => 'people#show'
      delete '/people/:id' => 'people#destroy'
    end
  end
end
