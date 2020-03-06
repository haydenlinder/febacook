import React from 'react';
import { createSession } from '../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class LoggedOutHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                password: "", email: ""
            },
            errors: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createSession(this.state.user)
        .fail(() => this.setState( {errors: this.props.errors} ))
    }

    render(){
        return(
            <div className="logged-out-header header">
                    <Link className="logo" to="/"> febacook </Link>
            
                    <form className="session-form">
                        
                        <div className="email"> 
                            <div>Email</div> 
                            < input
                                type = "text"
                                value = { this.state.user.email }
                                onClick={(e) => {
                                    this.setState({ errors: null })
                                }}  
                                onChange = {
                                    (e) => this.setState({user: {
                                        email: e.target.value,
                                        password: this.state.user.password
                                    }})
                                }
                            />
                        </div>
                        <div className="input">
                        <div className={this.state.errors ? "errors" : "no-errors"}>
                            {this.state.errors}
                        </div> 
                            <div className="password"> 
                                <div>Password</div> 
                                < input
                                    type = "text"
                                    value = { this.state.user.password }
                                    onClick={(e) => {
                                        this.setState({ errors: null })
                                    }}  
                                    onChange = {
                                        (e) => this.setState({user: { 
                                            password: e.target.value,
                                            email: this.state.user.email 
                                        }})
                                    }
                                />
                            </div>
                        </div>
                        
                        <button 
                            className="login"
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

const LoggedOutHeaderContainer = connect(msp, mdp)(LoggedOutHeader);

export default LoggedOutHeaderContainer;