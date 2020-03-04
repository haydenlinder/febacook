import React from 'react';
import { createSession } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

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
            <div class="logged-out-header clearfix">
                <Link className="logo" to="/"> febacook </Link>
        
                <form class="session-form">

                    <div class="email"> Email 
                        < input
                            type = "text"
                            value = { this.state.email }
                            onChange = {
                                (e) => this.setState({ 
                                    email: e.target.value 
                                })
                            }
                        />
                    </div>

                    <div class="password"> Password 
                        < input
                            type = "text"
                            value = { this.state.password }
                            onChange = {
                                (e) => this.setState({ 
                                    password: e.target.value 
                                })
                            }
                        />
                    </div>

                    
                    <div class="login-errors">
                        {this.props.errors}
                    </div> 
                    
                    <button 
                        class="login"
                        onClick={this.handleSubmit}
                    >
                        Log In
                    </button>

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