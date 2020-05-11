json.users do
    json.partial! "api/users/users", users: @users 
end

json.user do 
    json.partial! "api/users/user", user: @user
end

json.comments do 
    json.partial! "api/comments/comments", comments: @user.comments 
end