import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../../actions/user_actions'
import EditProfile from './edit_profile';
import PostFormContainer from '../posts/post_form_container';
import PostIndex from '../posts/posts_index';
import { openModal } from '../../../util/ui_util';
import UpdatePhoto from './update_photo';
import ProfilePhoto from './profile_photo';
import { createFriendship, deleteFriendship, updateFriendship } from '../../../actions/friendship_actions';
import UserIndexItems from '../users_index/user_index_items';

class Profile extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            profile: '',
            type: 'profile',
            right: 'timeline',
            user: '',
            bio: props.user.bio,
            edit_bio: false
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.username)
        .then(res => {
            this.setState({ user: res.users[this.props.username] })    
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.match.url)
        this.props.fetchUser(this.props.username)
        .then((res) => {
            this.setState({ user: res.users[this.props.username], right: 'timeline' })
        })
    }

    handleChange(e) {
        this.setState({ bio: e.currentTarget.value });
    }

    handleClick() {
        const {bio, edit_bio} = this.state;
        const { user, updateUser } = this.props;
        if (edit_bio) {
            const formData = new FormData();
            formData.set('user[id]', user.id);
            formData.set('user[bio]', bio);
            return updateUser(formData).then(() => this.setState({ edit_bio: false }));
        }
        this.setState({ edit_bio: !edit_bio });
    }

    friendAction() {
        const { currentUser } = this.props;
        const { user } = this.state;
        let received = user.authoredFriendRequests[currentUser.username];
        let sent = user.receivedFriendRequests[currentUser.username];
        if (sent !== undefined) {
            return sent[0] ? ['Unfriend', sent[1]] : ['Cancel', sent[1]];
        } else if (received !== undefined) {
            return received[0] ? ['Unfriend', received[1]] : ['Accept/Deny', received[1]];
        } 
        return ['Add'];
    }

    update() {
        const { username, fetchUser } = this.props;
        fetchUser(username).then((res) => this.setState({ user: res.users[username]}))
    }

    friends() {
        const users = Object.values(this.props.users);
        let user = this.state.user;
        const friends = users.filter(cand => user.friendHandles.includes(cand.username));
        return friends;
    }

    handleFriend(action, id) {
        const { user, currentUser, createFriendship, updateFriendship, deleteFriendship } = this.props;
        if (['Deny', 'Unfriend', 'Cancel'].includes(action)) deleteFriendship(id).then(() => this.update());
        if (action === 'Add') createFriendship({
            friendship: {
                author_handle: currentUser.username,
                author_id: currentUser.id,
                recipient_handle: user.username,
                recipient_id: user.id,
                accepted: false
            }
        }).then(() => this.update());
        if (action === 'Accept') updateFriendship({ friendship: {accepted: true }, id: id }).then(() => this.update());
    }

    friendButton() {
        const action = this.friendAction();
        const str = action[0];
        const id = action[1];
        if (str === 'Accept/Deny') {
            return (
                <div className="friend-buttons-container">
                    <div
                        className="edit-profile add-friend button button-border unselected"
                        onClick={e => this.handleFriend("Accept", id)}
                    >
                        Accept Friend Request
                    </div>
                    <div
                        className="edit-profile add-friend button button-border unselected"
                        onClick={e => this.handleFriend("Deny", id)}
                    >
                        Deny Friend Request
                    </div>
                </div>
            )
        } else if (str === 'Unfriend') {
            return (
                <div
                    className="edit-profile add-friend button button-border unselected"
                    onClick={e => this.handleFriend("Unfriend", id)}
                >
                    Unfriend
                </div>
            )
        } else if (str === 'Cancel') {
            return (
                <div
                    className="edit-profile add-friend button button-border unselected"
                    onClick={e => this.handleFriend("Cancel", id)}
                >
                    Cancel Friend Request
                </div>
            )
        } else if (str === "Add") {
            return (
                <div
                    className="edit-profile add-friend button button-border unselected"
                    onClick={e => this.handleFriend("Add", id)}
                >
                    Add Friend 
                </div>
            )
        }
    }

    render() {
        if (!this.state.user) return null;
        const friends = this.friends();
        const ownProfile = this.props.user.id === this.props.currentUser.id;
        const edit_bio = this.state.edit_bio;
        return(
            <div className="profile-container">
                <EditProfile 
                    user={this.props.user} 
                    updateUser={this.props.updateUser}
                    setState={this.setState.bind(this)}
                />
                <UpdatePhoto 
                    type={this.state.type}
                    user={this.props.user}
                    updateUser={this.props.updateUser}
                />
                <div id="top" className="profile-header-container">
                    <div className="cover-photo">
                        <img className="cover-photo-picture not-resized" src={this.props.user.coverPhotoUrl} alt=""/>
                    </div>
                    {ownProfile ?
                    <div 
                        className="update-cover-container"
                        onClick={(e) => {
                            e.stopPropagation();
                            openModal('update-photo-modal')
                            openModal('background-modal')
                        }}
                    >
                        <div className="camera-icon">
                        </div>
                        <div className="text"> 
                            Update Cover Photo
                        </div>
                    </div>
                    :
                    null
                    }
                    <div className="profile photo-container">
                        <ProfilePhoto url={this.props.user.profilePhotoUrl} />
                        {ownProfile ?
                        <div 
                            className="update"
                            onClick={e => {
                                e.stopPropagation();
                                this.setState({ type: 'profile' })
                                openModal('update-photo-modal')
                                openModal('background-modal')
                            }}
                        >
                            <div class="other-camera"></div>
                            <div className="update-text">
                                Update
                            </div>
                        </div>
                        :
                        null
                        }
                    </div>
                    <ul className="profile-nav-container">
                        <li 
                            onClick={(e) => this.setState({ right: "timeline" })}
                            className="timeline">
                            Timeline
                        </li>
                        {/* <li>
                            About
                        </li> */}
                        <li
                            onClick={e => this.setState({ right: "friends" })}
                        >
                            Friends
                        </li>
                        {/* <li>
                            Photos
                        </li> */}
                        {/* { ownProfile ?
                        <li className="archive">
                            <span className="lock-icon"></span>  Archive
                        </li> 
                        : 
                        null }
                        <li>
                            More <span className="arrow">▼</span>
                        </li> */}
                    </ul>
                </div>
                <div className="middle">
                    <div className="name"> 
                        {this.props.user.firstName} {this.props.user.lastName} 
                    </div>
                    <div className="middle-right">
                        {ownProfile ? 
                            <div 
                                className=" button button-border"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openModal('background-modal');
                                    openModal('edit-profile-modal');
                                }}
                            >
                                ✎ Edit Profile 
                            </div>
                            :
                            this.friendButton()
                        }           
                        {/* <div className="activity-log-container button-border">
                            <div className="activity-log button">
                                <div className="icon">
                                    ._ <br/>
                                    ._ <br />
                                    ._ <br />
                                </div>
                                <div className="text">
                                    Activity Log
                                </div>
                            </div>
                            <div className="activity-log-dropdown button unselected">
                                ...
                                <ul className="list">
                                    <li>
                                        Settings
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="middle-background"></div>
                <div className="profile-main">
                    <div className="profile-left">
                        <div className="intro">
                            <div className="title">
                                <div className="icon">
                                </div>
                                Intro
                            </div>
                                {edit_bio ?
                            <div className="bio-container">
                                <textarea 
                                    className="edit-bio-text" 
                                    value={this.state.bio} 
                                    onChange={e => this.handleChange(e)}
                                ></textarea>
                            </div>

                                :
                                <div className="bio-container">

                                <div className="bio">
                                    {this.props.user.bio}
                                </div>
                                </div>
                                }
                                {ownProfile ?
                                <div className="bio-container">
                                <div 
                                    onClick={() => {
                                        this.handleClick();
                                    }}
                                    className="bio-button">
                                    {edit_bio ? "Save" : "Edit Bio"}
                                </div> 
                                {edit_bio ? 
                                <div 
                                    onClick={() => {
                                        this.setState({ edit_bio: false, bio: this.props.user.bio })
                                    }}
                                    className="bio-button">
                                    Cancel
                                </div> : null}
                                </div>
                                
                                : null}
                        </div>
                    </div>
                    {this.state.right === 'timeline' ? 
                    <div className="profile-right">
                        <PostFormContainer 
                            recipientId={this.props.user.id} 
                            authorId={this.props.currentUser.id}
                            currentUser={this.props.currentUser}
                        />
                        <div className="posts">
                            Posts
                        </div>
                        <PostIndex 
                            currentUser={this.props.currentUser}
                            posts={this.props.posts}
                            comments={this.props.comments}
                            users={this.props.users}
                        />
                        </div> : <div className="profile-right">
                            {friends.length ?
                            <UserIndexItems users={friends} />
                            :
                            <div>
                            No Friends
                            </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}



const msp = (state, ownProps) => {
    const posts = {};
    const currentUser = state.entities.users[state.session.username];
    const user = state.entities.users[ownProps.match.params.username];
    Object.values(state.entities.posts).forEach(post => 
        post.recipientName === user.username ? posts[post.id] = post : null 
    );
    return({
        currentUser: currentUser,
        username: ownProps.match.params.username,
        users: state.entities.users,
        comments: state.entities.comments,
        user: user,
        posts: posts,
        friendships: state.entities.friendships
    })
}
const mdp = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username)),
    updateUser: (user) => dispatch(updateUser(user)),
    createFriendship: (friendship) => dispatch(createFriendship(friendship)),
    deleteFriendship: (id) => dispatch(deleteFriendship(id)),
    updateFriendship: (friendship) => dispatch(updateFriendship(friendship))
})

Profile = connect(msp, mdp)(Profile)

export default Profile;