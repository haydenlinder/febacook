json.extract! user, 
    :username, :first_name, :last_name, 
    :birthday, :gender, :pronouns, :bio, :id

if user.profile_photo.attached?
    json.profilePhotoUrl url_for(user.profile_photo) 
end

if user.cover_photo.attached?
    json.coverPhotoUrl url_for(user.cover_photo) 
end

