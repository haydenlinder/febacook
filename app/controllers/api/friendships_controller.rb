class Api::FriendshipsController < ApplicationController
    def create
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            render :show
        else
            render json: comment.errors, status: 422
        end
    end

    def update
        @friendship = Friendship.find_by(id: params[:id])
        if @friendship.update(friendship_params)
            render: show
        else
            render json: @friendship.errors, status: 422
        end
    end  

    def destroy
        @friendship = Friendship.find_by(id: params[:id])
        @friendship.delete
    end

    private
    def friendship_params
        params.require(:friendship).permit(:author_id, :recipient_id, :accepted)
    end
end