import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/user_actions'

class Profile extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        let that = this
        this.props.fetchUser(that.props.username)
        .then((res) => {
            that.setState({user: res.user})
        })
    }

    componentDidUpdate(prevProps) {
        let that = this
        // debugger
        if (prevProps.location.pathname !== this.props.match.url)
        this.props.fetchUser(that.props.username)
        .then((res) => {
            that.setState({ user: res.user })
        })
    }

    render() {
        if (!this.state.user) return null;
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
                        {this.state.user.firstName} {this.state.user.lastName} 
                    </div>

                    <div className="middle-right">

                        <div className="edit-profile button button-border">
                            {this.state.user.id === this.props.currentUser.id ? "Edit Profile" : "Add Friend"}
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

            </div>
        )
    }

}

const msp = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    username: ownProps.match.params.username
})

const mdp = dispatch => ({
    fetchUser: (username) => dispatch(fetchUser(username))
})

const ProfileContainer = connect(msp, mdp)(Profile)

export default ProfileContainer;