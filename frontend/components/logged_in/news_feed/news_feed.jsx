import React from 'react';
import PostFormContainer from '../posts/post_form_container';
import { connect } from 'react-redux';
import PostIndex from '../posts/posts_index';
import { fetchUsers } from '../../../actions/user_actions'
class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.props.fetchUsers();
    };

    render() {
        return(
            <div className="news-feed-container">
                <PostFormContainer 
                    recipientId={this.props.currentUser.id}
                    authorId={this.props.currentUser.id}
                    currentUser={this.props.currentUser}
                />
                <PostIndex 
                    currentUser={this.props.currentUser}
                    posts={this.props.posts}
                    comments={this.props.comments}
                    users={this.props.users}
                />
            </div>
        );
    };
};

const msp = state => ({
    currentUser: state.entities.users[state.session.username],
    users: state.entities.users,
    posts: state.entities.posts,
    comments: state.entities.comments
});

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
});

NewsFeed = connect(msp, mdp)(NewsFeed);

export default NewsFeed;