import React from 'react'
import { updateUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import { closeAncestorModal, closeModal } from '../../../util/ui_util';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bio: this.props.user.bio
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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

            <ul id="edit-profile-modal" className="edit-user-form modal-hide">

                <div className="label">
                    Edit Profile
                </div>

                <div className="label">
                    Edit Bio
                    <button
                        onClick={this.handleSubmit}
                        className="login">
                        save
                    </button>
                </div>

                <input
                    cols="30" rows="10"
                    onChange={(e) => {
                        this.setState({bio: e.target.value})
                    }}
                    value={this.state.bio || ""}
                />
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