import React from 'react';
import ProfilePhoto from '../profile/profile_photo';
import { connect } from 'react-redux';
import { createComment, deleteComment, updateComment } from '../../../actions/comment_actions'
import { fetchPost } from '../../../actions/post_actions';
import { Link } from 'react-router-dom';
import CommentForm from './comment_form';
import CommentItem from './comment_item';

class CommentsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    render(){
        const { currentUser, active, comments, users, post, 
            fetchPost, createComment, updateComment, deleteComment } = this.props;
        const commentList = comments.map(comment => {
            if (comment) {
                const author = users[comment.username]
                return(
                    <CommentItem comment={comment} author={author} 
                        currentUser={currentUser} post={post} fetchPost={fetchPost}
                        deleteComment={deleteComment} />
                );
            }
        });
        return(
            <div className="comment-index-container">
                {comments.length ?
                <div className="comment-index-content">
                    {commentList}
                </div> 
                : null}
                {active ? 
                <CommentForm currentUser={currentUser} post={post}
                    createComment={createComment} updateComment={updateComment}
                    fetchPost={fetchPost}/>
                : null}
            </div>
        );
    }
}

const msp = state => ({
    users: state.entities.users
});

const mdp = dispatch => ({
    createComment: comment => dispatch(createComment(comment)),
    fetchPost: id => dispatch(fetchPost(id)),
    deleteComment: id => dispatch(deleteComment(id)),
    updateComment: comment => dispatch(updateComment(comment))
});

export default connect(msp, mdp)(CommentsIndex);