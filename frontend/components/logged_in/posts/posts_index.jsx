import React from 'react';
import { Link } from 'react-router-dom';
import { convertDateTime } from '../../../util/date_util';

const PostIndex = ({posts, users, type}) => {
    let list = Object.values(posts).reverse();
    let postList = list.map((post) => 
        <ul className="post-container">

            <div className="not-photo">

                <ul className="post-header">

                    <li className="link">
                        <Link to={`/${post.authorName}`}>{users[post.authorName].firstName} {users[post.authorName].lastName}</Link>
                    </li>

                    {(type === "feed") ? 
                    <li className="link">
                        <Link to={`/${post.recipientName}`}>{users[post.recipientName].firstName} {users[post.recipientName].lastName}</Link>
                    </li> : null
                    }


                    <li className="timestamp">
                        {convertDateTime(post.createdAt)}
                    </li>
                    {post.createdAt !== post.updatedAt ? 
                    <li className="timestamp">
                        Updated {convertDateTime(post.updatedAt)}
                    </li> : null
                    }

                </ul>


                <li className="post-footer">
                    {post.body}
                </li>
            </div>

            <li className="post-footer">

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