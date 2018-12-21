class Api::V1::BathroomController < ApplicationController

  def create
    # byebug
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
end
