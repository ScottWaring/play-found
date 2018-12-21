class Api::V1::ReviewController < ApplicationController

  def create

    @review = Review.create(create_params)
    # byebug

    if @review
      render json: @review
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  private
  def create_params
    params.permit(:user_id, :playground_id, :title, :description)
  end
end
