import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../../actions/user_actions'
import EditProfile from './edit_profile';
import PostFormContainer from '../posts/post_form_container';
import PostIndex from '../posts/posts_index';
import { openModal } from '../../../util/ui_util';
import UpdatePhoto from './update_photo';

class Profile extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            profile: '',
            type: 'profile'
        }
    }

    componentDidMount() {
        this.props.fetchUser(this.props.username)
    }

    componentDidUpdate(prevProps) {
        let that = this
        if (prevProps.location.pathname !== this.props.match.url)
        this.props.fetchUser(that.props.username)
        .then((res) => {
            that.setState({ user: res.user })
        })
    }

    render() {
        if (!this.props.user) return null;
        const ownProfile = this.props.user.id === this.props.currentUser.id;
        return(
            <div className="profile-container">
                <EditProfile 
                    user={this.props.user} 
                    updateUser={this.props.updateUser}
                    />
                <UpdatePhoto 
                    type={this.state.type}
                    user={this.props.user}
                    updateUser={this.props.updateUser}
                />
                <div className="profile-header-container">
                    <div className="cover-photo">
                        <img className="cover-photo-picture" src={this.props.user.coverPhotoUrl} alt=""/>
                    </div>
                    {ownProfile ?
                    <div 
                        className="update-cover-container"
                        onClick={() => {
                            this.setState({type: 'cover'})
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
                    <div className="profile-photo-container">
                        <img src={this.props.user.profilePhotoUrl} className="profile-photo">
                        </img>
                        {ownProfile ?
                        <div 
                            className="update"
                            onClick={() => {
                                this.setState({ type: 'profile' })
                                openModal('update-photo-modal')
                                openModal('background-modal')
                            }}
                        >
                            <div class="other-camera"></div>
                            <div>
                                Update
                            </div>
                        </div>
                        :
                        null
                        }
                    </div>
                    <ul className="profile-nav-container">
                        <li className="timeline">
                            Timeline <span className="arrow">▼</span>
                        </li>
                        <li>
                            About
                        </li>
                        <li>
                            Friends
                        </li>
                        <li>
                            Photos
                        </li>
                        { ownProfile ?
                        <li className="archive">
                            <span className="lock-icon"></span>  Archive
                        </li> 
                        : 
                        null }
                        <li>
                            More <span className="arrow">▼</span>
                        </li>
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
                                onClick={() => {
                                    openModal('background-modal');
                                    openModal('edit-profile-modal');
                                }}
                            >
                                Edit Profile 
                            </div>
                            :
                            <div className="edit-profile button button-border unselected">
                                Add Friend
                            </div>
                        }           
                        <div className="activity-log-container button-border">
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
                        </div>
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
                            <div className="bio-container">
                                <div className="bio">
                                    {this.props.user.bio}
                                </div>
                                {ownProfile ?
                                <div 
                                    onClick={() => {
                                        openModal('background-modal');
                                        openModal('edit-profile-modal');
                                    }}
                                    className="bio-button">
                                    Edit Bio 
                                </div> : null}
                            </div>
                        </div>
                    </div>
                    <div className="profile-right">
                        <PostFormContainer 
                            recipientId={this.props.user.id} 
                            authorId={this.props.currentUser.id}
                        />
                        <div className="posts">
                            Posts
                        </div>
                        <PostIndex 
                            posts={this.props.posts}
                            users={this.props.users}
                            type={ownProfile ? "ownProfile" : "profile"}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

const msp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.username],
    username: ownProps.match.params.username,
    users: state.entities.users,
    user: state.entities.users[ownProps.match.params.username],
    posts: state.entities.posts
})

const mdp = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username)),
    updateUser: (user) => dispatch(updateUser(user))
})

Profile = connect(msp, mdp)(Profile)

export default Profile;