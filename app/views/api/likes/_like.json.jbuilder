json.extract! like, :post_id, :liker_id, :id
hash = { 
    likerName: like.liker.username
}

json.merge! hash 