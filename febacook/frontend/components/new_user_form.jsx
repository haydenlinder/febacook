import React from 'react';
import { createUser, createSession } from '../actions/session_actions';
import { connect } from 'react-redux';

class NewUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            username: "", password: "", email: "", 
            first_name: "", last_name: "",
            birthday: "", gender: "", pronouns: "", 
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (e.target.id === "new") {
            this.props.createUser(this.state)
            .fail(() => this.setState({errors: this.props.errors}));
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
                        
                            <div className={`${(this.state.errors.first_name || this.state.errors.last_name) ? "errors" : "no-errors"}`}>
                                First and last name required
                            </div>
                            <input
                                type="text" 
                                placeholder="First name"
                                value={this.state.first_name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    let nextState = Object.assign(this.state.errors, { first_name: null, last_name: null })
                                    this.setState({ errors: nextState })
                                }}                                
                                onChange={
                                    (e) => this.setState({ first_name: e.target.value})
                                }
                            />
                        
                            <input 
                                type="text" 
                                placeholder="Last name"
                                value={this.state.last_name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    let nextState = Object.assign(this.state.errors, { first_name: null, last_name: null })
                                    this.setState({ errors: nextState })
                                }}
                                onChange={
                                    (e) => this.setState({ last_name: e.target.value })
                                }
                            />
                        </div>

                        <div className="input">
                            <div className={this.state.errors.email ? "errors" : "no-errors"}>
                                {this.state.errors.email ? this.state.errors.email[0] : ""} 
                            </div>
                            <input 
                                type="text"
                                placeholder="Email" 
                                value={this.state.email}
                                onClick={(e) => { 
                                    e.preventDefault();
                                    let nextState = Object.assign(this.state.errors, {email: null})
                                    this.setState({ errors: nextState }) 
                                }}
                                onChange={
                                    (e) => this.setState({ email: e.target.value })
                                }
                            />
                        </div>

                        
                        <div className="input">
                            <div className={this.state.errors.password ? "errors" : "no-errors"}>
                                {this.state.errors.password} 
                            </div>
                            <input 
                                type="password"
                                placeholder="Password" 
                                value={this.state.password}
                                onClick={(e) => {
                                    e.preventDefault();
                                    let nextState = Object.assign(this.state.errors, { password: null })
                                    this.setState({ errors: nextState })
                                }}
                                onChange={
                                    (e) => this.setState({ password: e.target.value })
                                }
                            />
                        </div>

                        <div className="input">
                            <div className={this.state.errors.username ? "errors" : "no-errors"}>
                                {this.state.errors.username} 
                            </div>
                            <input 
                                type="text" 
                                placeholder="Username"
                                value={this.state.username}
                                onClick={(e) => {
                                    e.preventDefault();
                                    let nextState = Object.assign(this.state.errors, { username: null })
                                    this.setState({ errors: nextState })
                                }}
                                onChange={
                                    (e) => this.setState({ username: e.target.value })
                                }
                            />
                        </div>

                            <div className="input">
                                <div className="birthday-container">
                                <div>
                                    Birthday
                                </div>
                                <div className={this.state.errors.birthday ? "errors" : "no-errors"}>
                                    {this.state.errors.birthday} 
                                </div>
                                <input 
                                    type="date" 
                                    placeholder="1/1/1993"
                                    value={this.state.birthday}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let nextState = Object.assign(this.state.errors, { birthday: null })
                                        this.setState({ errors: nextState })
                                    }}
                                    onChange={
                                        (e) => this.setState({ birthday: e.target.value })
                                    }
                                />
                                </div>
                            </div>
                        Gender

                        <div
                        className="gender-input-container"
                        onClick={(e) => {
                            let nextState = Object.assign(this.state.errors, { gender: null })
                            this.setState({ errors: nextState })
                        }}
                        > 
                            
                                <input 
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onClick={
                                        (e) => this.setState({ gender: e.target.value })
                                    }
                                /><div className="title">Female</div>
                    

                    
                                <input 
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onClick={
                                        (e) => this.setState({ gender: e.target.value })
                                    }
                                /><div className="title">Male</div>
                    

                            
                                <input 
                                    type="radio"
                                    name="gender"
                                    value=""
                                    onClick={
                                        (e) => this.setState({ gender: e.target.value })
                                    }
                            /><div className="title">Custom</div>
                        </div>

                        <div className="custom-gender-container">

                            <div className="input">
                                <div className={this.state.errors.gender ? "errors" : "no-errors"}>
                                    {this.state.errors.gender}
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
                                <div className={this.state.errors.pronouns ? "errors" : "no-errors"}>
                                    {this.state.errors.pronouns} 
                                </div>
                                <select 
                                    type="text" 
                                    value={this.state.pronouns}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let nextState = Object.assign(this.state.errors, { pronouns: null })
                                        this.setState({ errors: nextState })
                                    }}
                                    onChange={
                                        (e) => this.setState({ pronouns: e.target.value })
                                    }
                                >
                                    <option value="she/her/hers">She: "Wish her a happy birthday!"</option>
                                    <option value="he/him/his">He: "Wish him a happy birthday!"</option>
                                    <option value="they/them/theirs">They: "Wish them a happy birthday!"</option>

                                </select>
                            </div>
                        </div>
                        
                        <div className="button-container">
                            <div id="new" className="sign-up-button" onClick={this.handleSubmit}>Sign Up</div>
                        </div>

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