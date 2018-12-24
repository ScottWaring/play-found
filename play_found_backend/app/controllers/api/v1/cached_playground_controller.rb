class Api::V1::CachedPlaygroundController < ApplicationController
  skip_before_action :authorized, only: [:show]

  def show

    @pg = CachedPlayground.find(find_pg_params[:id])

    if @pg
      render json: @pg
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

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

  def find_pg_params
    params.require(:body).permit(:id)
  end
end
