import React from 'react';
import { createUser, createSession } from '../actions/session_actions'
import { connect } from 'react-redux';

class SessionForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <div> 
                    Connect with friends and the world around you on Febacook.
                </div>
                <div> Sign Up </div>
                <div> It's quick and easy. </div>
                
            </form>
        )
    }
}

const msp = state => ({})

const mdp = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    createSession: credentials => dispatch(createSession(credentials))
})

const SessionFormContainer = connect(msp, mdp)(SessionForm);

export default SessionFormContainer;