import React from 'react';
import { Link } from 'react-router-dom';
import { convertDateTime } from '../../../util/date_util';

const PostIndex = ({posts, users, type}) => {

    let list = Object.values(posts).reverse();
    let postList = list.map((post) => 
        <ul className="post-container">
            <div className="not-photo">
                <ul className="post-header">
                    <span className="link">
                        <Link to={`/${post.authorName}`}>
                            {users[post.authorName].firstName} {users[post.authorName].lastName}
                        </Link> <span className="right-arrow"> ▶ </span> <Link to={`/${post.recipientName}`}>{users[post.recipientName].firstName} {users[post.recipientName].lastName}</Link>
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
                <li className="post-body">
                    {post.body}
                </li>
            </div>
            <div className="photos">
                {post.photoUrls.map(url => <img className="post-photo" src={url}></img>)}
            </div>
            <li className="post-footer">
            </li>
        </ul>   
    )
    
    // setTimeout(() => {
    //     let photos = document.getElementsByClassName('post-photo');
    //     for (let i = 0; i < photos.length; i++) {
    //         let width = photos[i].offsetWidth;
    //         let height = photos[i].offsetHeight;
    //         let ratio = width/height;
    //         photos[i].style.width = "100%";
    //     };
    // }, 100)
    return (
        <ul className="post-list">
            {postList}
        </ul>
    )
}

export default PostIndex;