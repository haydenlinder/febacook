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
                </div>

                profile
            </div>
        )
    }

}

const msp = state => ({
    
})

const mdp = dispatch => ({

})

const ProfileContainer = connect(msp, mdp)(Profile)

export default ProfileContainer;