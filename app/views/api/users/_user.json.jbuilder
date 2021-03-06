json.extract! user, 
    :username, :first_name, :last_name, 
    :birthday, :gender, :pronouns, :bio, :id


hash = {
    receivedFriendRequests: {},
    authoredFriendRequests: {},
    friendHandles: [],
    friendRequestHandles: []
}

user.received_friend_requests.each do |req| 
    hash[:receivedFriendRequests][req.author_handle] = [req.accepted, req.id]
    hash[:friendRequestHandles] << req.author_handle if !req.accepted 
    hash[:friendHandles] << req.author_handle if req.accepted
end

user.authored_friend_requests.each do |req| 
    hash[:authoredFriendRequests][req.recipient_handle] = [req.accepted, req.id]
    hash[:friendHandles] << req.recipient_handle if req.accepted
end


if user.profile_photo.attached?
    json.profilePhotoUrl url_for(user.profile_photo) 
end

if user.cover_photo.attached?
    json.coverPhotoUrl url_for(user.cover_photo) 
end

json.merge! hash

