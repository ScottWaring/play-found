class SearchController < ApplicationController
  skip_before_action :authorized, only: [:create, :find_place]

  def create
    if params.include?(:location)
      googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/textsearch/json?query=playground+near+#{params[:location]}&radius=3000&key=#{ENV['GOOGLE_API_KEY']}"
    elsif params.include?(:long) && !params.include?(:location)
      googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=playground&location=#{params[:lat]},#{params[:long]}&rankby=distance&types=play&key=#{ENV['GOOGLE_API_KEY']}"
    end
    retResp = JSON.parse(googleResp)
    render json: retResp
  end

  def find_place
    if params.include?(:id)
      googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{params[:id]}&key=#{ENV['GOOGLE_API_KEY']}"
    end
    retResp = JSON.parse(googleResp)
    render json: retResp
  end


end
