import React from 'react';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import { convertDateTime } from '../../../util/date_util';
import ProfilePhoto from '../profile/profile_photo';
import { createLike, deleteLike } from '../../../actions/like_actions';
import { fetchPost, deletePost } from '../../../actions/post_actions';
import CommentsIndex from './comments_index';
import PostFormContainer from './post_form_container';
import { openModal } from '../../../util/ui_util';

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            edit: false,
            toggle: false
        };
    }

    handleLike(e, post, liked) {
        const { currentUser, createLike, deleteLike, fetchPost } = this.props;
        let target = e.currentTarget;
        liked ?
            deleteLike(liked)
            .then(() =>
                fetchPost(post.id)
                // target.classList.remove('liked')
            )
            :
            createLike({ liker_id: currentUser.id, post_id: post.id })
            .then(() =>
                fetchPost(post.id)
                // target.classList.add('liked')
            )
        ;
    }

    editPost() {
        let backgroundModal = document.getElementById('background-modal');
        if (backgroundModal) backgroundModal.addEventListener('click', () => {
            this.setState.call(this, { edit: false })
        })
    }

    render() {
        const { post, comments, users, currentUser, deletePost } = this.props;
        const { edit, toggle } = this.state;
        const ownPost = post.authorId === currentUser.id;
        let liked = post.likes[currentUser.id];
        const numLikes = Object.values(post.likes).length;
        return !edit ? (
            <ul className="post-container">
                <div className="not-photo">
                    <ul className="post-header">
                        {ownPost ?
                        <div className="post-dropdown-container"> 
                            <div className="toggle-post-dropdown" onClick={e => {
                                e.stopPropagation();
                                let dropdown = e.currentTarget.nextElementSibling;
                                if (dropdown.classList.contains('modal-show')) {
                                    dropdown.classList.add('modal-hide');
                                    dropdown.classList.remove('modal-show');
                                } else {
                                    dropdown.classList.add('modal-show');
                                    dropdown.classList.remove('modal-hide');
                                }
                            }}>...</div>
                         
                            <div className={`post-dropdown modal-hide`}>
                                <div 
                                    className="post-dropdown-item"
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.setState({ edit: true });
                                        openModal('background-modal');
                                        this.editPost();
                                    }}
                                >
                                    Edit
                                </div>
                                <div 
                                    className="post-dropdown-item"
                                    onClick={e => deletePost(post.id)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div> : null}
                        <span className="link">
                            <Link to={`/${post.authorName}#top`}>
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
                        <ProfilePhoto url={users[post.authorName].profilePhotoUrl} />
                    </div>
                    <li className="post-body">
                        {post.body}
                    </li>
                </div>
                <div className="photos">
                    {Object.keys(post.photos).map(url => <img className="post-photo" src={url}></img>)}
                </div>
                {numLikes ? 
                    <div className={`like-count ${liked ? 'liked' : null}`}>(: {numLikes}</div>
                : null}
                <li className="post-footer">
                    <div onClick={e => this.handleLike(e, post, liked)} className={`post-footer-button ${liked ? 'liked' : null}`}>
                        <span className={`like icon`}>(:</span> Like
                    </div>
                    <div onClick={e => this.setState({ active: true })} className="post-footer-button">
                        <span className="comment icon">//</span>Comment
                    </div>
                    {/* <div className="post-footer-button">
                    <span className="share icon">➦</span>Share
                    </div> */}
                </li>
                <CommentsIndex active={this.state.active} post={post} comments={comments} currentUser={currentUser}/>
            </ul>
        ) : (
            <PostFormContainer
                recipientId={post.recipientId}
                authorId={currentUser.id}
                currentUser={currentUser}
                body={post.body}
                photos={Object.assign({}, post.photos)}
                id={post.id}
                edit={true}
                setState={this.setState.bind(this)}
            />
        )
    }
}

const msp = state => ({
    likes: state.entities.likes
})

const mdp = dispatch => ({
    createLike: like => dispatch(createLike(like)),
    deleteLike: id => dispatch(deleteLike(id)),
    fetchPost: id => dispatch(fetchPost(id)),
    deletePost: id => dispatch(deletePost(id))
})

export default connect(msp, mdp)(PostIndexItem);