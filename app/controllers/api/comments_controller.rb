class Api::CommentsController < ApplicationController
    
    def create
        @comment = Comment.new(comment_params)
        if @comment.save
            render :show
        else
            render json: @comment.errors, status: 422
        end
    end

    def destroy
        @comment = Comment.find_by(id: params[:id])
        @comment.delete
    end

    private
    def comment_params
        params.require(:comment).permit(:user_id, :post_id, :body)
    end
end