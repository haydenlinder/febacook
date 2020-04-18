class Api::PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if @post.save
      render :show
    else
      render json: @post.errors, status: 422
    end 
  end

  def show
    @post = Post.find_by(id: params[:id])
    if !@post
      render json: {}, status: 404
    end
    render :show
  end
  
  def update
    @post = Post.find_by(id: params[:id])
    if @post.update(post_params)
      render :show
    else
      render json: @user.errors, status: 422
    end 
  end

  def index 
    @post = Post.all 
    render :index
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    if !@post
      render json: {}, status: 422
    end
  end

  private
  def post_params
    params.require(:post).permit(:body, :recipient_id, :author_id, {:photos => []})
  end
end
