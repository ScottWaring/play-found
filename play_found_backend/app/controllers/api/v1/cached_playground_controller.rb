class Api::V1::CachedPlaygroundController < ApplicationController

  def create
    @playground = CachedPlayground.create(create_params)
    @playground.coordinates.push(params[:coordinates])
    params[:photos].each {|p| @playground.photos.push(p)}
    @playground.save
    if @playground
      render json: @playground
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  private
  def create_params
    params.permit(:user_id, :bathroom, :business_type, :name, :address, :description)
  end
end
