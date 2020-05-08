json.users do 
    json.partial! "api/users/users", users: @users
end

json.posts do
    json.partial! "api/posts/posts", posts: @user.received_posts
end

json.comments do 
    json.partial! "api/comments/comments", comments: @user.received_posts.map { |post| post.comments }.flatten
end

json.friendships do 
    json.partial! "api/friendships/friendships", friendships: @user.received_friend_requests + @user.authored_friend_requests
end