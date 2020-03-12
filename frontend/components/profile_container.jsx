import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../actions/user_actions'
import EditUserFormContainer from './edit_user_form_container';
import { $fetchUser } from '../util/user_api_util';

class Profile extends React.Component{

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let that = this
        this.props.fetchUser(that.props.username)
    }

    componentDidUpdate(prevProps) {
        let that = this
        if (prevProps.location.pathname !== this.props.match.url)
        this.props.fetchUser(that.props.user.username)
        .then((res) => {
            that.setState({ user: res.user })
        })
    }

    render() {
        if (!this.props.user) return null;
        return(
            <div className="profile-container">

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

                        <div className="edit-profile button button-border unselected">
                            {this.props.user.id === this.props.currentUser.id ? "Edit Profile" : "Add Friend"}

                            <EditUserFormContainer user={this.props.user} />
                        </div>

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

                                <div className="bio-button">
                                    Edit Bio
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-right">

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

                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

let user;



const msp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    username: ownProps.match.params.username,
    user: state.entities.users[ownProps.match.params.username]
})

const mdp = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username)),
    updateUser: (user) => dispatch(updateUser(user))
})

const ProfileContainer = connect(msp, mdp)(Profile)

export default ProfileContainer;