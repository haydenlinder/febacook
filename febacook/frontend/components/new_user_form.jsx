import React from 'react';
import { createUser, createSession } from '../actions/session_actions';
import { connect } from 'react-redux';

class NewUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            username: "", password: "", email: "", 
            first_name: "", last_name: "",
            birthday: "", gender: "", pronouns: "" 
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (e.target.id === "new") {
            this.props.createUser(this.state)
        } else {
            this.props.createSession({ 
                email: "user1@email.com", password: "password"
            });
        }
        
    }

    render () {
        return (
            <div className="logged-out-home">


                <div className="greeting">
                    <div className="connect">
                        Connect with friends and the world around you on Febacook.
                    </div>
                    <div className="signup"> Sign Up </div>
                    <div className="easy"> It's quick and easy. </div>
                    <button id="demo" onClick={this.handleSubmit}> Try it out </button>

                </div>

                <form className="user-form">
                    <div className="input">
                        First Name
                        <div className="errors">
                            {this.props.errors.first_name}
                        </div>
                        <input 
                            type="text" 
                            value={this.state.first_name}
                            onChange={
                                (e) => this.setState({ first_name: e.target.value })
                            }
                            />
                    </div>

            
                    <div className="input">

                        Last Name <br /> {this.props.errors.last_name} 
                        <input 
                            type="text" 
                            value={this.state.last_name}
                            onChange={
                                (e) => this.setState({ last_name: e.target.value })
                            }
                        />
                    </div>

                    <div className="input">
                        Email <br /> {this.props.errors.email} 
                        <input 
                            type="text" 
                            value={this.state.email}
                            onChange={
                                (e) => this.setState({ email: e.target.value })
                            }
                        />
                    </div>

                    
                    <div className="input">
                        Password <br /> {this.props.errors.password} 
                        <input 
                            type="text" 
                            value={this.state.password}
                            onChange={
                                (e) => this.setState({ password: e.target.value })
                            }
                        />
                    </div>

                    <div className="input">
                        Username <br /> {this.props.errors.username} 
                        <input 
                            type="text" 
                            value={this.state.username}
                            onChange={
                                (e) => this.setState({ username: e.target.value })
                            }
                        />
                    </div>
                    
                    <div className="input">
                        Birthday <br /> {this.props.errors.birthday} 
                        <input 
                            type="date" 
                            value={this.state.birthday}
                            onChange={
                                (e) => this.setState({ birthday: e.target.value })
                            }
                        />
                    </div>

                    
                    <div className="input">
                        Gender <br /> {this.props.errors.gender} 
                        <input 
                            type="text" 
                            value={this.state.gender}
                            onChange={
                                (e) => this.setState({ gender: e.target.value })
                            }
                        />
                    </div>
                    
                    <div className="input">
                        Pronouns <br /> {this.props.errors.pronouns} 
                        <input 
                            type="text" 
                            value={this.state.pronouns}
                            onChange={
                                (e) => this.setState({ pronouns: e.target.value })
                            }
                        />
                    </div>

                    <button id="new" onClick={this.handleSubmit}>Sign Up</button>

                </form>

            </div>
        )
    }
}

const msp = (state) => ({
    errors: state.errors.session,
    state: state
})

const mdp = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    createSession: credentials => dispatch(createSession(credentials))
})

const NewUserFormContainer = connect(msp, mdp)(NewUserForm);

export default NewUserFormContainer;