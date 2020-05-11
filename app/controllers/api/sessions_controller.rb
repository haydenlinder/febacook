class Api::SessionsController < ApplicationController

  def create
    @user = User
      .includes(
        :received_friends,
        :authored_friends,
        :potential_authored_friends,
        :potential_received_friends,
        :posters,
        :authored_posts_commenters,
        :received_posts_commenters,
        received_posts: [:author, :recipient, :likers, comments: [:user]],
        authored_friend_requests: [:recipient],
        received_friend_requests: [:author],
      )
      .find_by_credentials(
        params[:user][:email],
        params[:user][:password]
      )
    if @user 
      login!(@user)
        @users = 
          @user.received_friends + @user.authored_friends + 
          @user.posters + @user.authored_posts_commenters + 
          @user.received_posts_commenters + @user.potential_authored_friends +
          @user.potential_received_friends
        @users.push(@user) 
      render :create
    else
      render json: { login: ["Invalid credentials"] }, status: 422
    end
  end

  def destroy
    logout! 
  end
end
