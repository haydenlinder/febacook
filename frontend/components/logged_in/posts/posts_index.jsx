import React from 'react';
import PostIndexItem from './post_index_item';

const PostIndex = ({posts, likes, users, currentUser, createLike, deleteLike}) => {

    let list = Object.values(posts).reverse();
    let postList = list.map((post) => {
        return(
            <PostIndexItem users={users} post={post} currentUser={currentUser}/>
        );
    });
    
    return (
        <ul className="post-list">
            {postList}
        </ul>
    );
}

export default PostIndex;