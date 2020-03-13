import React from 'react';
import { Link } from 'react-router-dom';

const PostIndex = ({posts, users, type}) => {
    let list = Object.values(posts).reverse();
    let postList = list.map((post) => 
        <ul className="post-container">

            <li className="link">
                <Link to={`/${post.authorName}`}>{users[post.authorName].firstName} {users[post.authorName].lastName}</Link>
            </li>

            {(type === "feed") ? 
            <li className="link">
                <Link to={`/${post.recipientName}`}>{users[post.recipientName].firstName} {users[post.recipientName].lastName}</Link>
            </li> : null
            }


            <li className="timestamp">
                created {post.createdAt}
            </li>

            <li className="timestamp">
                updated {post.updatedAt}
            </li>

            <li>
                {post.body}
            </li>

        </ul>   
    )

    return (
        <ul className="post-list">
            {postList}
        </ul>
    )
}

export default PostIndex;