class Api::V1::BathroomController < ApplicationController
  skip_before_action :authorized, only: [:find_local_bathrooms]

  def find_local_bathrooms
    @bathrooms_lat = Bathroom.all.select {|br|((br.coordinates[0]["lat"] - find_params[:lat]).round(4).abs).between?(0, 0.02)}
    @bathrooms = @bathrooms_lat.select {|br|((br.coordinates[0]["lng"] - find_params[:long]).round(4).abs).between?(0, 0.04)}
    if @bathrooms.length > 0
      render json: {status: 200, bathrooms: @bathrooms }
    else
      render json: {status: 404, message: "No Bathrooms Found For Location"}
    end
  end



  def create
    @bathroom = Bathroom.create(create_params)
    @bathroom.coordinates.push(params[:coordinates])
    params[:photos].each {|p| @bathroom.photos.push(p)}
    @bathroom.save
    if @bathroom
      render json: @bathroom
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  private
  def create_params
    params.permit(:user_id, :changing_table, :business_type, :name, :address, :description)
  end

  def find_params
    params.permit(:lat, :long)
  end
end
