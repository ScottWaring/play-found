class Api::V1::CachedPlaygroundController < ApplicationController
  skip_before_action :authorized, only: [:show]

  def show
    @pg = CachedPlayground.find(find_pg_params[:id])
    rev_arr = []
    @reviews = Review.all.select {|r| r.playground_id.to_i === @pg.id}
    @reviews.each {|r|rev_arr.push({review: r, created_by: r.user.username})}
    if @pg
      render json: {status: 200, playground: @pg, reviews: rev_arr}
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  def create
    @playground = CachedPlayground.create(create_params)
    @playground.coordinates.push(coords_params)
    params[:photos].each {|p| @playground.photos.push(p)}
    @playground.save
    if @playground
      render json: @playground
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  def update
    @pg = CachedPlayground.find_by(id: update_params[:id], user_id: update_params[:user_id])
    @pg.update(bathroom: update_params[:bathroom], name: update_params[:name], address: update_params[:address], description: update_params[:description], business_type: update_params[:business_type])
    @pg.coordinates = []
    @pg.coordinates.push(params[:coordinates])
    @pg.photos = []
    params[:photos].each {|p| @pg.photos.push(p)}
    @pg.save
    # byebug
  end

  def destroy
    CachedPlayground.find_by(id: delete_params[:playground_id], user_id: delete_params[:user_id]).destroy
  end

  private
  def create_params
    params.permit(:user_id, :bathroom, :business_type, :name, :address, :description)
  end

  def coords_params
    params.require(:coordinates).permit(:lat, :lng)
  end

  def find_pg_params
    params.require(:body).permit(:id)
  end

  def delete_params
    params.permit(:playground_id, :user_id)
  end

  def update_params
    params.permit(:id,:user_id,:coordinates,:bathroom,:business_type,:photos,:name,:address,:description)
  end
end
