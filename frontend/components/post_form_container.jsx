import React from 'react';
import { createPost } from '../actions/post_actions'
import { connect } from 'react-redux';

class PostForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            body: "", 
            photos: [], 
            author_id: this.props.authorId,
            recipient_id: this.props.recipientId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        let that = this
        this.props.createPost(this.state)
        .then(() => 
            this.setState({ body: ""})

        )
    }

    render() {
        return(

            <div className="post-form-container">

                <ul className="post-form-header">

                    <li className="button-container">
                        <div className="post-icon">

                        </div>
                        Create Post
                    </li>

                    <div className="border"></div>

                    <li className="button-container">
                        <div className="photo-icon">

                        </div>
                        Photo/Video
                    </li>

                    <div className="border"></div>

                    <li className="button-container">
                        <div className="video-icon">

                        </div>
                        Live Video
                    </li>

                    <div className="border"></div>

                    <li className="button-container">
                        <div className="event-icon">

                        </div>
                        Life Event
                    </li>

                </ul>

                <textarea 
                    value={this.state.body}
                    className="body"
                    onChange={(e) => this.setState({body: e.target.value})}
                >
                    
                </textarea>

                <button 
                    onClick={this.handleSubmit}
                    className="login">
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

