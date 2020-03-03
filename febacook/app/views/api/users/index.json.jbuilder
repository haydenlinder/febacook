json.users @users do |user|
    json.set! user.id, json.partial! "api/users/user"
end