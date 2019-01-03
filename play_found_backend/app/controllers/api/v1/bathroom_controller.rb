class Api::V1::BathroomController < ApplicationController
  skip_before_action :authorized, only: [:find_local_bathrooms]

  def find_local_bathrooms
    # byebug
    @bathrooms_lat = Bathroom.all.select {|br|((br.coordinates[0]["lat"].to_f - find_params[:lat]).round(4).abs).between?(0, 0.02)}
    @bathrooms = @bathrooms_lat.select {|br|((br.coordinates[0]["lng"].to_f - find_params[:long]).round(4).abs).between?(0, 0.04)}
    if @bathrooms.length > 0
      render json: {status: 200, bathrooms: @bathrooms }
    else
      render json: {status: 404, message: "No Bathrooms Found For Location"}
    end
  end

  def create
    @bathroom = Bathroom.create(create_params)
    @bathroom.coordinates.push(coords_params)
    params[:photos].each {|p| @bathroom.photos.push(p)}
    @bathroom.save
    if @bathroom
      render json: {status: 200, bathroom: @bathroom}
    else
      render json: {status: 400, message: "No Good Homie"}
    end
  end

  def update
    @bathroom = Bathroom.find(update_params[:id])
    @bathroom.update(changing_table: update_params[:changing_table], name: update_params[:name], address: update_params[:address], description: update_params[:description], business_type: update_params[:business_type])
    @bathroom.coordinates_will_change!
    @bathroom.coordinates = []
    @bathroom.coordinates.push(params[:coordinates])
    @bathroom.photos_will_change!
    @bathroom.photos = params[:photos]
    @bathroom.save
    # byebug
  end

  def destroy
    Bathroom.find_by(id: delete_params[:bathroom_id], user_id:  delete_params[:user_id]).destroy
  end

  private
  def create_params
    params[:coordinates]||[]
    params.permit(:user_id, :changing_table, :business_type, :name, :address, :description, :coordinates)
  end

  def coords_params
    params.require(:coordinates).permit(:lat, :lng)
  end

  def find_params
    params.permit(:lat, :long)
  end

  def delete_params
    params.permit(:bathroom_id, :user_id)
  end

  def update_params
    params[:photos]||[]
    params.permit(:id,:user_id,:business_type, :changing_table,:photos, :coordinates,:name,:address,:description)
  end
end
