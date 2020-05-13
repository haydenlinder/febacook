json.post do 
    json.partial! "api/posts/post", post: @post 
end

json.comments do 
    json.partial! "api/comments/comments", comments: @post.comments
end