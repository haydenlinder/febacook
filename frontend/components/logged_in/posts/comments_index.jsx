import React from 'react';
import ProfilePhoto from '../profile/profile_photo';
import { connect } from 'react-redux';
import { createComment } from '../../../actions/comment_actions'
import { fetchPost } from '../../../actions/post_actions';
import { Link } from 'react-router-dom';

class CommentsIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    handleSubmit(e) {
        const { currentUser, post, createComment, fetchPost } = this.props;
        e.preventDefault();
        if (!this.state.comment) return null
        createComment({
            user_id: currentUser.id,
            post_id: post.id,
            body: this.state.comment
        }).then(() => {
            fetchPost(post.id)
            this.setState({ comment: '' })
        })
    }

    handleChange(e) {
        this.setState({ comment: e.currentTarget.value });
    }

    render(){
        const { currentUser, active, comments, users } = this.props;
        const commentList = comments.map(comment => {
            const author = users[comment.username]
            return(
            <div className="comment-container">
                <div className="comment-content">
                    <div className="photo-container">
                        <ProfilePhoto url={author.profilePhotoUrl} />
                    </div>
            <div className="comment-body"><Link to={`/users/${author.username}`}>{author.firstName} {author.lastName}</Link> {comment.body}</div>
                </div>
            </div>
            );
        })
        return(
            <div className="comment-index-container">

                {comments.length ?
                <div className="comment-index-content">
                    {commentList}
                </div> 
                : null}

                {active ? 
                <div className="comment-form-content">
                    <form 
                        className="comment-form"
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        <div className="photo-container">
                            <ProfilePhoto url={currentUser.profilePhotoUrl}/> 
                        </div>
                        <input 
                            className="comment-input"
                            type="text" 
                            placeholder="Write a comment..."
                            value={this.state.comment}
                            onChange={e => this.handleChange(e)}
                        /> 
                    </form> 
                </div>
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
    fetchPost: id => dispatch(fetchPost(id))
});

export default connect(msp, mdp)(CommentsIndex);