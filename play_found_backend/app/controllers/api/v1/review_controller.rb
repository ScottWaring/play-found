class Api::V1::ReviewController < ApplicationController
  skip_before_action :authorized, only: [:find]

  def find
    rev_arr = []
    @reviews = Review.all.select {|r| r.playground_id === find_params[:id]}
    @reviews.each {|r|rev_arr.push({review: r, created_by: r.user.username})}
    if rev_arr.length > 0
      render json: {status: 200, reviews: rev_arr}
    else
      render json: {status: 204, message: "No Reviews Found"}
    end
  end

  def create
    @review = Review.create(create_params)
    if @review
      render json: {status: 200, review: @review, created_by: @review.user.username}
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  def destroy
    Review.find_by(id: delete_params[:review_id], user_id:  delete_params[:user_id]).destroy
  end

  private
  def create_params
    params.permit(:user_id, :playground_id, :title, :description, :playground_name)
  end

  def find_params
    params.permit(:id)
  end

  def delete_params
    params.permit(:review_id, :user_id)
  end
end
