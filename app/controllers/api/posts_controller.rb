class Api::PostsController < ApplicationController
  def create
    new_params = post_params
    new_params.delete(:signed_ids)

    @post = Post.new(new_params)
    if @post.save
      render :show
    else
      render json: @post.errors, status: 422
    end 
  end

  def show
    @post = Post.includes(:likes, comments: [:user]).find_by(id: params[:id])
    if !@post
      render json: {}, status: 404
    end
    render :show
  end
  
  def update
    @post = Post.find_by(id: params[:id])
    post_params[:signed_ids].split(',').each do |signed_id|
      @image = ActiveStorage::Blob.find_signed(signed_id)
      @image.attachments.first.purge
    end

    new_params = post_params 
    new_params.delete(:signed_ids)

    if @post.update(new_params)
      render :show
    else
      render json: @user.errors, status: 422
    end 
  end

  def index 
    @posts = Post.all 
    render :index
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    @post.delete
  end

  private
  def post_params
    params.require(:post).permit(:body, :recipient_id, :author_id, {:photos => []}, [:signed_ids])
  end
end
