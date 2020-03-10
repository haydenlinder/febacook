import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component{

    constructor(props) {
        super(props)
    }

    
    render() {
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
                            {this.props.currentUser.firstName} {this.props.currentUser.lastName} 
                        </div>

                        <div className="middle-right">

                            <div className="edit-profile button button-border">
                                Edit Profile
                            </div>

                            <div className="activity-log-container button-border">
                                <div className="activity-log button">
                                    Activity Log
                                </div>
                                <div className="activity-log-dropdown button unselected">
                                    ...
                                </div>
                            </div>

                        </div>

                    </div>

            </div>
        )
    }

}

const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mdp = dispatch => ({

})

const ProfileContainer = connect(msp, mdp)(Profile)

export default ProfileContainer;