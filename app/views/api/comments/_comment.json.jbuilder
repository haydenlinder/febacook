json.extract! comment, :post_id, :user_id, :id, :body
hash = { 
    username: comment.user.username
}

json.merge! hash 