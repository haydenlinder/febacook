class Api::LikesController < ApplicationController
    
    def create
        @like = Like.new(like_params)
        if @like.save
            render :show
        else
            render json: @like.errors, status: 422
        end
    end

    def destroy
        @like = Like.find_by(id: params[:id])
        @like.delete
    end

    private
    def like_params
        params.require(:like).permit(:liker_id, :post_id)
    end
end