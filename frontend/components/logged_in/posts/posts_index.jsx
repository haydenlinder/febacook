import React from 'react';
import { Link } from 'react-router-dom';
import { convertDateTime } from '../../../util/date_util';

const PostIndex = ({posts, users}) => {

    let list = Object.values(posts).reverse();
    let postList = list.map((post) => 
        <ul className="post-container">
            <div className="not-photo">
                <ul className="post-header">
                    <span className="link">
                        <Link to={`/${post.authorName}`}>
                            {users[post.authorName].firstName} {users[post.authorName].lastName}
                        </Link>  
                        {post.authorName !== post.recipientName ?
                        <span> <span className="right-arrow">▶</span> <Link to={`/${post.recipientName}`}>{users[post.recipientName].firstName} {users[post.recipientName].lastName}</Link></span>
                        :
                        null
                        }
                    </span>
                    <li className="timestamp">
                        {convertDateTime(post.createdAt)}
                    </li>
                    {post.createdAt !== post.updatedAt ? 
                    <li className="timestamp">
                        Updated {convertDateTime(post.updatedAt)}
                    </li> : null
                    }
                </ul>
                <div className="photo-container post-show">
                    <img className="profile-photo not-resized" src={users[post.authorName].profilePhotoUrl} alt="" />
                </div>
                <li className="post-body">
                    {post.body}
                </li>
            </div>
            <div className="photos">
                {post.photoUrls.map(url => <img className="post-photo" src={url}></img>)}
            </div>
            <li className="post-footer">
                <div className="post-footer-button">
                    <span className="like icon">☺</span> Like
                </div>
                <div className="post-footer-button">
                    <span className="comment icon">⑊</span>Comment
                </div>
                <div className="post-footer-button">
                    <span className="share icon">➦</span>Share
                </div>
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