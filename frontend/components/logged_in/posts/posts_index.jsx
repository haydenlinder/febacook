import React from 'react';
import PostIndexItem from './post_index_item';

const PostIndex = ({posts, comments, users, currentUser}) => {

    let list = Object.values(posts).reverse();
    let postList = list.map((post) => {
        let postComments = post.commentIds.map(id => comments[id])
        return(
            <PostIndexItem users={users} post={post} currentUser={currentUser} comments={postComments}/>
        );
    });
    
    return (
        <ul className="post-list">
            {postList}
        </ul>
    );
}

export default PostIndex;