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
            User.includes(
                :received_friends,
                :authored_friends,
                :potential_received_friends,
                :potential_authored_friends,
                :posters,
                :authored_posts_commenters,
                :received_posts_commenters,
                received_posts: [:author, :recipient, :likers, comments: [:user]],
                authored_friend_requests: [:recipient],
                received_friend_requests: [:author],
            )
            .find_by(username: params[:username])

        unless @user
            render json: @user.errors, status: 404
        end
        @users = 
            @user.received_friends + @user.authored_friends + 
            @user.posters + @user.authored_posts_commenters + 
            @user.received_posts_commenters + @user.potential_authored_friends +
            @user.potential_received_friends
        @users.push(@user) 
        render :show
    end

    def index
        nameFragment = params[:nameFragment]
        nameFragment = nameFragment.downcase if nameFragment
        @users = 
        User.includes(
            :authored_friend_requests,
            :received_friend_requests,
            authored_posts: [:author, :recipient, comments: [:user]],
        )
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
