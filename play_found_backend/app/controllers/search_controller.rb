class SearchController < ApplicationController
  skip_before_action :authorized, only: [:create, :find_place]

  def create
    google_resp = RestClient.get "https://maps.googleapis.com/maps/api/place/nearbysearch/json?name=playground&location=#{params[:lat]},#{params[:long]}&rankby=distance&types=play&key=#{ENV['GOOGLE_API_KEY']}"
    @playgrounds_lat = CachedPlayground.all.select {|pg|((pg.coordinates[0]["lat"].to_f - params[:lat]).round(4).abs).between?(0, 0.02)}
    @playgrounds = @playgrounds_lat.select {|pg|((pg.coordinates[0]["lng"].to_f - params[:long]).round(4).abs).between?(0, 0.04)}
    ret_resp = JSON.parse(google_resp)
    ret_resp_results = ret_resp["results"]

    if @playgrounds.length > 0
      new_pg_arr = @playgrounds.concat(ret_resp_results)
      render json: new_pg_arr[0..19]
    else
      render json: ret_resp_results
    end
  end

  def find_place
    if params.include?(:id)
      google_resp = RestClient.get "https://maps.googleapis.com/maps/api/place/details/json?placeid=#{params[:id]}&key=#{ENV['GOOGLE_API_KEY']}"
    end
    ret_resp = JSON.parse(google_resp)
    rev_arr = []
    @reviews = Review.all.select {|r| r.playground_id === ret_resp["result"]["id"]}
    @reviews.each {|r|rev_arr.push({review: r, created_by: r.user.username})}
    render json: {status: 200, playground: ret_resp, reviews: rev_arr}
  end


end
