json.extract! user, 
    :username, :first_name, :last_name, 
    :birthday, :gender, :pronouns, :bio, :id


hash = {
    receivedFriendRequests: {},
    authoredFriendRequests: {},
    friendIds: []
}

user.received_friend_requests.each do |req| 
    hash[:receivedFriendRequests][req.author_handle] = [req.accepted, req.id]
    hash[:friendIds] << req.author_handle if req.accepted
end

user.authored_friend_requests.each do |req| 
    hash[:authoredFriendRequests][req.recipient_handle] = [req.accepted, req.id]
    hash[:friendIds] << req.recipient_handle if req.accepted
end


if user.profile_photo.attached?
    json.profilePhotoUrl url_for(user.profile_photo) 
end

if user.cover_photo.attached?
    json.coverPhotoUrl url_for(user.cover_photo) 
end

json.merge! hash

