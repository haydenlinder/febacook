import React from 'react';
import { createPost, updatePost } from '../../../actions/post_actions'
import { connect } from 'react-redux';
import { openModal, closeModal, closeModals } from '../../../util/ui_util';
import ProfilePhoto from '../profile/profile_photo';

class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            body: props.body || "", 
            photos: props.photos || {}, 
            author_id: this.props.authorId,
            recipient_id: this.props.recipientId,
            modal: 'modal-hide',
            post: props.post,
            signedIds: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { body, author_id, recipient_id, signedIds } = this.state;
        const photos = Object.values(this.state.photos).filter(val => !val.signed_id);
        const formData = new FormData();
        formData.append('post[body]', body);
        formData.append('post[author_id]', author_id);
        formData.append('post[recipient_id]', recipient_id);
        formData.append('post[signed_ids]', signedIds);
        for (let i = 0; i < photos.length; i++) {
            formData.append('post[photos][]', photos[i]);
        }
        if (this.props.id) {
            return this.props.updatePost(formData, this.props.id)
            .then(() => {
                closeModal('post-form-modal');
                closeModal('background-modal')
                this.props.setState({ edit: false }, () => closeModals())
            });
        }
        this.props.createPost(formData)
        .then(() => {
            closeModal('post-form-modal');
            closeModal('background-modal')
            this.setState({ body: "", photos: {} }, () => closeModals());
        });
    };

    handleFile(e) {
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = (event) => {
            let newPhoto = { [event.target.result]: file };
            this.setState({ photos: {...this.state.photos, ...newPhoto}});
        }; 
        if (file) {
            fileReader.readAsDataURL(file);
        };
    };

    removePhoto(src) {
        let signedId = this.state.photos[src].signed_id;
        if (signedId) this.setState({ signedIds: [...(this.state.signedIds), signedId] })
        delete this.state.photos[src];
        this.setState({ photos: this.state.photos });
    };

    render() {
        const { id } = this.props;
        const preview = Object.keys(this.state.photos).map(src => (
            <div className="preview-item">
                <img className="preview" src={src}></img>
                <div className="preview-cover"> </div>
                <div 
                    onClick={() => this.removePhoto(src)}
                    className="remove-photo">x</div> 
            </div>
        ));
        const empty = !this.state.body && !Object.values(this.state.photos).length;
        const { modal } = this.state;
        const edit = this.props.edit;
        return(
            <div 
                onClick={(e) => {
                    e.stopPropagation();
                    openModal(edit ? `post-form-modal-${id}` : `post-form-modal-new`);
                    // this.setState({ modal: 'modal-show' })
                    openModal('background-modal');
                }}
                id={id ? `post-form-modal-${id}` : `post-form-modal-new`}
                className={`post-form-container ${id ? `modal-show` : `modal-hide`}` }>
                <ul className="post-form-header">
                    {edit ?
                    null
                    :
                    <li className="button-container">
                        <div className="post-icon">

                        </div>
                        Create Post
                    </li>}
                    <div className="border"></div>
                    <li className="button-container">
                        <label htmlFor="file" className="photo-icon">

                        </label>
                        <label htmlFor={`file-${id}`}>Photo/Video
                        </label> 
                        <input 
                            id={`file-${id}`} 
                            name="file" 
                            className="file-input" 
                            type="file"
                            onChange={(e) => this.handleFile(e)}
                        />
                    </li>
                </ul>
                <div className="post-form photo-container">
                    <ProfilePhoto url={this.props.currentUser.profilePhotoUrl} />
                </div>

                <textarea 
                    value={this.state.body}
                    className="body"
                    placeholder="What's on your mind?"
                    onChange={(e) => this.setState({body: e.target.value})}
                >  
                </textarea>
                {preview}
                <div className="post-form-footer"></div>
                <button 
                    onClick={e => this.handleSubmit(e)}
                    className={`login ${empty ? 'disabled' : 'able'}`}
                    
                >
                    {edit ? `Save` : `Post`}
                </button>
                {edit ?
                <button 
                    onClick={e => {
                        this.props.setState({edit: false},
                        () => closeModal('background-modal'));
                    }}
                    className={`login cancel`}
                >
                    Cancel
                </button> : null }
            </div>
        )
    }
}

const msp = state => ({
    post: { body: "", photo: null},
    
})

const mdp = dispatch => ({
    createPost: post => dispatch(createPost(post)),
    updatePost: (post, id) => dispatch(updatePost(post, id))
})

const PostFormContainer = connect(msp, mdp)(PostForm);

export default PostFormContainer;

