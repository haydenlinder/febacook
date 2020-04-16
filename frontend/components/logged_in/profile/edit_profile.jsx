import React from 'react'
import { updateUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import { closeAncestorModal, closeModal } from '../../../util/ui_util';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.user;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.persist();
        this.props.updateUser(this.state)
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