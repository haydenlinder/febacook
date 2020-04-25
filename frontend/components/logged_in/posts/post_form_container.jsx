import React from 'react';
import { createPost } from '../../../actions/post_actions'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../../util/ui_util';
import ProfilePhoto from '../profile/profile_photo';

class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            body: "", 
            photos: {}, 
            author_id: this.props.authorId,
            recipient_id: this.props.recipientId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { body, author_id, recipient_id } = this.state;
        const photos = Object.values(this.state.photos);
        const formData = new FormData();
        formData.append('post[body]', body);
        formData.append('post[author_id]', author_id);
        formData.append('post[recipient_id]', recipient_id);
        for (let i = 0; i < photos.length; i++) {
            formData.append('post[photos][]', photos[i]);
        }
        this.props.createPost(formData)
        .then(() => {
            closeModal('post-form-modal');
            closeModal('background-modal')
            this.setState({ body: "", photos: {} });
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
        delete this.state.photos[src];
        this.setState(this.state);
    };

    render() {
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
        return(
            <div 
                onClick={() => {
                    openModal('post-form-modal');
                    openModal('background-modal');
                }}
                id="post-form-modal" 
                className="post-form-container modal-hide">
                <ul className="post-form-header">
                    <li className="button-container">
                        <div className="post-icon">

                        </div>
                        Create Post
                    </li>
                    <div className="border"></div>
                    <li className="button-container">
                        <label htmlFor="file" className="photo-icon">

                        </label>
                        <label htmlFor="file">Photo/Video
                        </label> 
                        <input 
                            id="file" 
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
                    onClick={this.handleSubmit}
                    className={`login ${empty ? 'disabled' : 'able'}`}
                    
                >
                    Post
                </button>
            </div>
        )
    }
}

const msp = state => ({
    post: { body: "", photo: null},
    
})

const mdp = dispatch => ({
    createPost: post => dispatch(createPost(post))
})

const PostFormContainer = connect(msp, mdp)(PostForm);

export default PostFormContainer;

