import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../../actions/user_actions'
import EditProfile from './edit_profile';
import PostFormContainer from '../posts/post_form_container';
import PostIndex from '../posts/posts_index';
import { openModal } from '../../../util/ui_util';

class Profile extends React.Component{

    constructor(props) {
        super(props)
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
        return(
            <div className="profile-container">
                
                <EditProfile user={this.props.user} />

                <div className="profile-header-container">
                    <div className="cover-photo">
                        
                    </div>
                    <div className="update-cover-container">
                        <div className="camera-icon">
                            
                        </div>
                        <div className="text"> 
                            Update Cover Photo
                        </div>
                    </div>

                    <div className="profile-photo-container">
                        <div className="profile-photo">

                        </div>
                        <div className="update">
                            Update
                        </div>

                    </div>

                    <ul className="profile-nav-container">
                        <li>
                            Timeline
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
                        <li>
                            Archive
                        </li>
                        <li>
                            More
                        </li>
                    </ul>

                </div>

                <div className="middle">

                    <div className="name"> 
                        {this.props.user.firstName} {this.props.user.lastName} 
                    </div>

                    <div className="middle-right">

                        {this.props.user.id === this.props.currentUser.id ? 

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

                                <div 
                                    onClick={() => {
                                        openModal('background-modal');
                                        openModal('edit-profile-modal');
                                    }}
                                    className="bio-button">
                                    Edit Bio 
                                </div>
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
                            type={"profile"}
                            />
                    </div>

                </div>
            </div>
        )
    }

}

let user;



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