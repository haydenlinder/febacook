import React from 'react';
import ProfilePhoto from '../profile/profile_photo';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.body || ''
        };
    }

    handleSubmit(e) {
        const { currentUser, post, createComment, fetchPost, updateComment, edit, id, setState } = this.props;
        e.preventDefault();
        if (!this.state.body) return null;
        if (edit) {
            return updateComment({
                user_id: currentUser.id,
                post_id: post.id,
                body: this.state.body,
                id: id
            }).then(() => setState({edit: false}))
        }
        createComment({
            user_id: currentUser.id,
            post_id: post.id,
            body: this.state.body
        }).then(() => {
            fetchPost(post.id)
            this.setState({ body: '' })
        });
    }

    handleChange(e) {
        this.setState({ body: e.currentTarget.value });
    }

    render() {
        const { currentUser, comment } = this.props;
        return (
            <div className="comment-form-content">
                <form
                    className="comment-form"
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <div className="photo-container">
                        <ProfilePhoto url={currentUser.profilePhotoUrl} />
                    </div>
                    <input
                        className="comment-input"
                        type="text"
                        placeholder="Write a comment..."
                        value={this.state.body}
                        onChange={e => this.handleChange(e)}
                    />
                </form>
            </div>
        )
    }
}

export default CommentForm; 