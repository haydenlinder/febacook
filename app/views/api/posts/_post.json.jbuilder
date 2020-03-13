json.extract! post, 
    :body, :photos, :created_at, :updated_at, :author_id, :recipient_id

hash = { 
    authorName: post.author.username, 
    recipientName: post.recipient.username 
}

json.merge! hash 

