import React from 'react';
import { createSession, clearAllSessionErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class LoggedOutHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                password: "", email: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        // e.preventDefault();
        // this.props.clearAllSessionErrors();
        // this.props.createSession(this.state.user)
        // .fail(() => this.setState( {errors: this.props.errors} ))

        e.preventDefault();
        this.props.clearAllSessionErrors();
        if (e.target.id === "login") {
            this.props.createSession(this.state.user)
            .fail(() => this.setState({ errors: this.props.errors }));
        } else {
            let emails = [
                'lisa@email.com',
                'mscott@dundermifflin.com',
                'kid@email.com',
                'grumpycat@email.com'
            ]
            this.props.createSession({
                email: emails[Math.floor(4*Math.random())], password: "password"
            });
        }
    }

    render(){
        return(
            <div className="logged-out-header header">
                <div className="logged-out-nav">

                
                    <Link className="logo" to="/"> febacook </Link>
            
                    <form className="session-form">
                        <div className="input">
                            <div className={this.props.errors ? "errors" : "no-errors"}>
                                {this.props.errors}
                            </div> 
                            <div className="email"> 
                                <div>Email</div> 
                                < input
                                    type = "text"
                                    value = { this.state.user.email }
                                    onClick={(e) => {
                                        this.props.clearAllSessionErrors()
                                    }}  
                                    onChange = {
                                        (e) => this.setState({user: {
                                            email: e.target.value,
                                            password: this.state.user.password
                                        }})
                                    }
                                />
                            </div>
                        </div>

                            <div className="password"> 
                                <div>Password</div> 
                                < input
                                    type = "password"
                                    value = { this.state.user.password }
                                    onClick={(e) => {
                                        this.props.clearAllSessionErrors()
                                    }}  
                                    onChange = {
                                        (e) => this.setState({user: { 
                                            password: e.target.value,
                                            email: this.state.user.email 
                                        }})
                                    }
                                />
                            </div>
                        
                        <button 
                            id="login"
                            className="login"
                            onClick={this.handleSubmit}
                        >
                            Log In
                        </button>
                        <button id="header-demo" className="login" onClick={this.handleSubmit}> Demo </button>


                    </form>
                </div>
            </div>
        )
    }
}

const msp = state => ({
    errors: state.errors.session.login
})

const mdp = dispatch => ({
    createSession: (credentials) => dispatch(createSession(credentials)),
    clearAllSessionErrors: (errors) => dispatch(clearAllSessionErrors(errors))
})

const LoggedOutHeaderContainer = connect(msp, mdp)(LoggedOutHeader);

export default LoggedOutHeaderContainer;