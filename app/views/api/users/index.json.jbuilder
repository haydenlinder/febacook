json.users do 
    json.partial! "api/users/users", users: @users
end

json.posts do
    json.partial! "api/posts/posts", posts: @users.map { |user| user.authored_posts }.flatten
end

json.likes do
    json.partial! "api/likes/likes", likes: @users.map { |user| user.authored_posts.map { |post| post.likes } }.flatten
end

json.comments do
    json.partial! "api/comments/comments", comments: @users.map { |user| user.authored_posts.map { |post| post.comments } }.flatten
end

