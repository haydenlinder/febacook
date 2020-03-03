class Api::UsersController < ApplicationController
    before_action :require_login, only: [:update]

    def create
        @user = User.new(user_params)
        if @user.save!
            render :create
        else
            render json: @user.errors.full_messages, status: 422
        end
    end
    
    def update
        @user = User.find_by(id: params[:id])
        if @user.update(user_params)
            render :update             
        else
            render json: @user.errors.full_messages, status: 422
        end
    end
    
    def show
        @user = User.find_by(id: params[:id])
        unless @user
            render json: @user.errors.full_messages, status: 404
        end
    end

    def index
        @users = User.all
        render :index
    end

    private
    def user_params
        params.require(:user).permit(
            :username, :password, :email, 
            :first_name, :last_name, :bio,
            :birthday, :gender, :pronouns
        )
    end
end
