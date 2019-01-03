class Api::V1::ContentController < ApplicationController
  def user_content
    pg_arr = []
    @user = User.find(user_params[:id])
    @user.cached_playgrounds.each{|pg| pg_arr.push({id: pg.id, name: pg.name, address: pg.address, object_type: pg.object_type})}
    if @user
      render json: {status: 200, user_content: {reviews: @user.reviews, bathrooms: @user.bathrooms, playgrounds: pg_arr}}
    else
      render json: {status: 400, message: "Please Log In"}
    end
  end

  private
  def user_params
    params.require(:user).permit(:id)
  end
end
