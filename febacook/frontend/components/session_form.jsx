import React from 'react';
import { createSession } from '../actions/session_actions';
import { connect } from 'react-redux';

class SessionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: "", email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createSession(this.state)
    }

    render(){
        return(
            <div>
                <div class="logo">febacook</div>
                <form>
                    Email
                    < input
                        type = "text"
                        value = { this.state.email }
                        onChange = {
                            (e) => this.setState({ email: e.target.value })
                        }
                        />
                    < br />

                    Password
                    < input
                        type = "text"
                        value = { this.state.password }
                        onChange = {
                            (e) => this.setState({ password: e.target.value })
                        }
                    />
                    <br/> {this.props.errors} <br/>
                    <button onClick={this.handleSubmit}>Log In</button>

                </form>
            </div>
        )
    }
}

const msp = state => ({
    errors: state.errors.session.login
})

const mdp = dispatch => ({
    createSession: (credentials) => dispatch(createSession(credentials))
})

const SessionFormContainer = connect(msp, mdp)(SessionForm);

export default SessionFormContainer;