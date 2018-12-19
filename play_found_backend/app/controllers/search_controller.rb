class SearchController < ApplicationController
  skip_before_action :authorized, only: [:create, :find_place]

  def create
    # byebug
    # API_KEY = ENV['GOOGLE_API_KEY']
    if params.include?(:long)
      googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=playground&location=#{params[:lat]},#{params[:long]}&rankby=distance&types=play&key=#{ENV['GOOGLE_API_KEY']}"
    # elsif params.include?(:location)
    #   googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=#{params[:location]}&name=playground&rankby=distance&types=play&key=#{ENV['GOOGLE_API_KEY']}"
    end
    # byebug
    retResp = JSON.parse(googleResp)
    render json: retResp
  end

  def find_place
    # byebug
    if params.include?(:id)
      googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{params[:id]}&key=#{ENV['GOOGLE_API_KEY']}"
    # elsif params.include?(:location)
    #   googleResp = RestClient.get "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=#{params[:location]}&name=playground&rankby=distance&types=play&key=#{ENV['GOOGLE_API_KEY']}"
    end
    # byebug
    retResp = JSON.parse(googleResp)
    render json: retResp
  end


end
