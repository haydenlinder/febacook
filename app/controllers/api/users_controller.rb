class Api::UsersController < ApplicationController
    before_action :require_login, only: [:update]

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :create
        else
            render json: @user.errors, status: 422
        end
    end
    
    def update
        @user = User.find_by(id: params[:id])
        if @user.update(user_params)
            render :update             
        else
            render json: @user.errors, status: 422
        end
    end
    
    def show
        @user = 
            User.includes(received_posts: [:author, :recipient, :likers, comments: [:user]])
            .find_by(username: params[:username])

        unless @user
            render json: @user.errors, status: 404
        end
        @users = @user.received_posts.map { |post| post.author }. + @user.received_posts.map { |post| post.comments.map {|comment| comment.user} }.flatten
        @users.push(@user) 
        render :show
    end

    def index
        nameFragment = params[:nameFragment]
        @users = 
        User.includes(authored_posts: [:author, :recipient, comments: [:user]])
        .where('lower(first_name) LIKE ? OR lower(last_name) LIKE ?', "%#{nameFragment}%", "%#{nameFragment}%")        
        render :index
    end 

    private
    def user_params
        params.require(:user).permit(
            :username, :password, :email, 
            :first_name, :last_name, :bio,
            :birthday, :gender, :pronouns,
            :profile_photo, :cover_photo
        )
    end
end
