class Api::V1::ContentController < ApplicationController
  def user_content
    @user = User.find(user_params[:id])
    if @user
      render json: {status: 200, user_content: {reviews: @user.reviews, bathrooms: @user.bathrooms, playgrounds: @user.cached_playgrounds}}
    else
      render json: {status: 400, message: "Please Log In"}
    end
  end

  private
  def user_params
    params.require(:user).permit(:id)
  end
end
