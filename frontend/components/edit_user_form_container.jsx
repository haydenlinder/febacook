import React from 'react'
import { updateUser } from '../actions/user_actions';
import { connect } from 'react-redux';

class EditUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.user
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
                        onClick={
                            (e) => {
                                e.persist();
                                this.props.updateUser.bind(this)(this.state)
                                    .then(() => {
                                        const selectedParent = (target) => {
                                            if (target.parentElement.classList.contains("selected")) {
                                                return target.parentElement
                                            }
                                            return selectedParent(target.parentElement)
                                        }
                                        selectedParent(e.target).classList.add("unselected")
                                        selectedParent(e.target).classList.remove("selected")
                                    })
                            }
                        }
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