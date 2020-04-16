import React from 'react'
import { updateUser } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import { closeAncestorModal, closeModalBackground } from '../../../util/ui_util';

class EditUserForm extends React.Component {
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
                closeAncestorModal(e);
                closeModalBackground();
            }
        );
    }

    render(){
        return(

            <ul className="edit-user-form">

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

const EditUserFormContainer = connect(msp, mdp)(EditUserForm)

export default EditUserFormContainer;