import React from 'react'
import { updateUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../../util/ui_util';
import ProfilePhoto from './profile_photo';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bio: this.props.user.bio
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({ bio: this.props.user.bio })
        }
    }

    handleSubmit(e) {
        e.persist();
        let formData = new FormData();
        formData.append('user[bio]', this.state.bio)
        formData.append('user[id]', this.props.user.id)
        this.props.updateUser(formData)
        .then( 
            () => {
                closeModal('edit-profile-modal');
                closeModal('background-modal');
            }
        );
    }

    render(){
        return(

            <ul id="edit-profile-modal" className="edit-user-form modal-hide"
                onClick={e => e.stopPropagation()}
            >

                <div className="label">
                    Edit Profile
                </div>
                {/* <div className="edit-profile-photos-container">
                    <img src={this.props.user.coverPhotoUrl} className="not-resized"/>
                </div> */}
                <div className="profile-header-container">
                    <div className="cover-photo">
                        <img className="cover-photo-picture" src={this.props.user.coverPhotoUrl} alt=""/>
                    </div>
                    <div 
                        className="update-cover-container"
                        onClick={() => {
                            this.props.setState({type: 'cover'})
                            openModal('update-photo-modal')
                            openModal('background-modal')
                            closeModal('edit-profile-modal')
                        }}
                    >
                        <div className="camera-icon">
                        </div>
                        <div className="text"> 
                            Update Cover Photo
                        </div>
                    </div>
                    <div className="profile photo-container">
                        <ProfilePhoto url={this.props.user.profilePhotoUrl} />
                        <div 
                            className="update"
                            onClick={() => {
                                this.props.setState({ type: 'profile' })
                                openModal('update-photo-modal')
                                openModal('background-modal')
                                closeModal('edit-profile-modal')
                            }}
                        >
                            <div class="other-camera"></div>
                            <div className="update-text">
                                Update
                            </div>
                        </div>
                    </div>
                <div className="label">
                    Edit Bio
                    <button
                        onClick={this.handleSubmit}
                        className="login">
                        save
                    </button>
                </div>

                <textarea
                    cols="30" rows="10"
                    onChange={(e) => {
                        this.setState({bio: e.target.value})
                    }}
                    value={this.state.bio || ""}
                />
                </div>
            </ul>
        )
    }
}

const msp = (state, ownProps) => ({
})

const mdp = dispatch => ({
    updateUser: user => dispatch(updateUser(user))
})

EditProfile = connect(msp, mdp)(EditProfile);

export default EditProfile;