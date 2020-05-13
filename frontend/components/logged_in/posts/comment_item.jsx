import React from 'react';
import ProfilePhoto from '../profile/profile_photo';
import { Link } from 'react-router-dom';


class CommentItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { comment, author, currentUser, deleteComment, post, fetchPost } = this.props;
        const ownComment = comment.userId === currentUser.id
        return(
            <div className="comment-container">
                <div className="comment-content">
                    <div className="photo-container">
                        <ProfilePhoto url={author.profilePhotoUrl} />
                    </div>
                    <div className="comment-body"><Link to={`/${author.username}#top`}>{author.firstName} {author.lastName}</Link> {comment.body}</div>
                    {ownComment ?
                    <div className="edit-delete-comment">
                        <div className="edit-comment">Edit</div>
                            <div className="delete-comment" onClick={e => deleteComment(comment.id).then(() => fetchPost(post.id))}>Delete</div>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default CommentItem;