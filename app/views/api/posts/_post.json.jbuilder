json.extract! post, 
:body, :created_at, :updated_at, :author_id, :recipient_id, :id
json.photoUrls post.photos.map { |photo| url_for(photo) }
json.commentIds post.comments.map{ |comment| comment.id }
likehash = { likes: {} }
post.likes.each { |like| likehash[:likes][like.liker_id] = like.id }
hash = { 
    authorName: post.author.username, 
    recipientName: post.recipient.username 
}


json.merge! hash 
json.merge! likehash

