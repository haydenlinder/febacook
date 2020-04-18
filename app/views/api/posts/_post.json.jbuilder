json.extract! post, 
:body, :created_at, :updated_at, :author_id, :recipient_id
json.photoUrls post.photos.map { |photo| url_for(photo) }
hash = { 
    authorName: post.author.username, 
    recipientName: post.recipient.username 
}

json.merge! hash 

