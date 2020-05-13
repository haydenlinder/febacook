import React from 'react';
import ProfilePhoto from '../profile/profile_photo';
import { Link } from 'react-router-dom';
import CommentForm from './comment_form';

class CommentItem extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            edit: false
        };
    }

    render(){
        const { comment, author, currentUser, deleteComment, post, fetchPost, updateComment } = this.props;
        const { edit } = this.state;
        const ownComment = comment.userId === currentUser.id
        return edit ? 
            <div className="comment-container">
                <CommentForm currentUser={currentUser} body={comment.body} edit={true} updateComment={updateComment} post={post} id={comment.id}
                    setState={this.setState.bind(this)}/>
                <div className="edit-delete-comment cancel">
                    <div className="edit-comment" onClick={e => this.setState({ edit: false })}>Cancel</div>
                </div>
            </div>
            :
            <div className="comment-container">
                <div className="comment-content">
                    <div className="photo-container">
                        <ProfilePhoto url={author.profilePhotoUrl} />
                    </div>
                    <div className="comment-body"><Link to={`/${author.username}#top`}>{author.firstName} {author.lastName}</Link> {comment.body}</div>
                    {ownComment ?
                    <div className="edit-delete-comment">
                        <div className="edit-comment" onClick={e => this.setState({edit: true})}>Edit</div>
                        <div className="delete-comment" onClick={e => deleteComment(comment.id).then(() => fetchPost(post.id))}>Delete</div>
                    </div> : null}
                </div>
            </div>
        
    }
}

export default CommentItem;