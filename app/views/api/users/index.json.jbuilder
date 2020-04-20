json.users do 
    json.partial! "api/users/users", users: @users
end

json.posts do
    json.partial! "api/posts/posts", posts: @users.map { |user| user.authored_posts }.flatten
end