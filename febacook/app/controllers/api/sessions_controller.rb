class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user 
      login!(@user)
      render :create
    else
      render json: ["Invalid credentials"], status: 422
    end
  end

  def destroy
    logout! 
  end
end
