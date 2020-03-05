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
            <div className="logged-out-home-container">
                <div className="logged-out-home">
                    <div className="greeting">
                        <ul className="connect">
                            <div className="title">
                                Connect with friends and the <br/> 
                                world around you on Febacook.
                            </div>
                            <li>
                               <div className="sprite-container">
                                   <div className="sprite one">sprite</div>
                               </div> 
                                <b>See photos and updates</b> from friends in News Feed.

                            </li>
                            <li>
                                <div className="sprite-container">
                                    <div className="sprite two">sprite</div>
                                </div> 
                                <b>Share what's new</b> in your life on your Timeline.
                            </li>
                            <li>
                                <div className="sprite-container">
                                    <div className="sprite three">sprite</div>
                                </div> 
                                <b>Make connections</b> around the world.
                            </li>
                        </ul>

                    </div>

                    <form className="user-form">

                        <div className="message">
                            <div className="signup"> Sign Up </div>
                            <div className="line2">
                                <div className="easy"> It's quick and easy. </div>
                                <button id="demo" className="demo" onClick={this.handleSubmit}> Try it out </button>
                            </div>
                        </div>

                        <div className="input name">
                        
                            <div className="errors">
                                {this.props.errors.first_name}
                            </div>
                            <input
                                type="text" 
                                placeholder="First name"
                                value={this.state.first_name}
                                onChange={
                                    (e) => this.setState({ first_name: e.target.value })
                                }
                            />
                        
                            <div className="errors">
                                {this.props.errors.last_name} 
                            </div>
                            <input 
                                type="text" 
                                placeholder="Last name"
                                value={this.state.last_name}
                                onChange={
                                    (e) => this.setState({ last_name: e.target.value })
                                }
                            />
                        </div>

                        <div className="input">
                            <div className="errors">
                                {this.props.errors.email} 
                            </div>
                            <input 
                                type="text"
                                placeholder="Email" 
                                value={this.state.email}
                                onChange={
                                    (e) => this.setState({ email: e.target.value })
                                }
                            />
                        </div>

                        
                        <div className="input">
                            <div className="errors">
                                {this.props.errors.password} 
                            </div>
                            <input 
                                type="password"
                                placeholder="Password" 
                                value={this.state.password}
                                onChange={
                                    (e) => this.setState({ password: e.target.value })
                                }
                            />
                        </div>

                        <div className="input">
                            <div className="errors">
                                {this.props.errors.username} 
                            </div>
                            <input 
                                type="text" 
                                placeholder="Username"
                                value={this.state.username}
                                onChange={
                                    (e) => this.setState({ username: e.target.value })
                                }
                            />
                        </div>
                        
                        <div className="input">
                            Birthday
                            <div className="errors">
                                {this.props.errors.birthday} 
                            </div>
                            <input 
                                type="date" 
                                placeholder="1/1/1993"
                                value={this.state.birthday}
                                onChange={
                                    (e) => this.setState({ birthday: e.target.value })
                                }
                            />
                        </div>
                        Gender
                        <div className="gender-input-container">
                                 
                            <div className="errors">
                                {this.props.errors.gender} 
                            </div>
                            
                                <input 
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onClick={
                                        (e) => this.setState({ gender: e.target.value })
                                    }
                                /><div>Female</div>
                    

                    
                                <input 
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onClick={
                                        (e) => this.setState({ gender: e.target.value })
                                    }
                                /><div>Male</div>
                    

                            
                                <input 
                                    type="radio"
                                    name="gender"
                                    value=""
                                    onClick={
                                        (e) => this.setState({ gender: e.target.value })
                                    }
                                /><div>Custom</div>
                            </div>

                        <div className="input">
                            <div className="errors">
                                {this.props.errors.gender}
                            </div>
                            <input
                                type="text"
                                placeholder="Gender"
                                value={this.state.gender}
                                onChange={
                                    (e) => this.setState({ gender: e.target.value })
                                }
                            />
                        </div>
                        
                        <div className="input">
                            <div className="errors">
                                {this.props.errors.pronouns} 
                            </div>
                            <input 
                                type="text" 
                                placeholder="Pronouns"
                                value={this.state.pronouns}
                                onChange={
                                    (e) => this.setState({ pronouns: e.target.value })
                                }
                            />
                        </div>

                        <button id="new" onClick={this.handleSubmit}>Sign Up</button>

                    </form>
                </div>
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