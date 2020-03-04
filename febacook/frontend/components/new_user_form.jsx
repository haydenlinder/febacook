import React from 'react';
import { createUser, createSession } from '../actions/session_actions'
import { connect } from 'react-redux';

class NewUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            username: "", password: "", email: "", 
            first_name: "", last_name: "",
            birthday: "", gender: "", pronouns: "" 
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createUser(this.state)
    }


    render () {
        return (
            <div>

                <div>
                    Connect with friends and the world around you on Febacook.
                </div>
                <br/>
                <div> Sign Up </div>
                <div> It's quick and easy. </div>
                <br/>
                <form>
                    
                    First Name <br/> {this.props.errors.first_name} <br/>
                    <input 
                        type="text" 
                        value={this.state.first_name}
                        onChange={
                            (e) => this.setState({ first_name: e.target.value })
                        }
                        />
                    <br/>

                    Last Name <br /> {this.props.errors.last_name} <br/>
                    <input 
                        type="text" 
                        value={this.state.last_name}
                        onChange={
                            (e) => this.setState({ last_name: e.target.value })
                        }
                        />
                    <br/>

                    Email <br /> {this.props.errors.email} <br/>
                    <input 
                        type="text" 
                        value={this.state.email}
                        onChange={
                            (e) => this.setState({ email: e.target.value })
                        }
                        />
                    <br/>
                    
                    Password <br /> {this.props.errors.password} <br/>
                    <input 
                        type="text" 
                        value={this.state.password}
                        onChange={
                            (e) => this.setState({ password: e.target.value })
                        }
                        />
                    <br/>
                    
                    Username <br /> {this.props.errors.username} <br/>
                    <input 
                        type="text" 
                        value={this.state.username}
                        onChange={
                            (e) => this.setState({ username: e.target.value })
                        }
                        />
                    <br/>

                    Birthday <br /> {this.props.errors.birthday} <br/>
                    <input 
                        type="date" 
                        value={this.state.birthday}
                        onChange={
                            (e) => this.setState({ birthday: e.target.value })
                        }
                        />
                    <br/>

                    Gender <br /> {this.props.errors.gender} <br/>
                    <input 
                        type="text" 
                        value={this.state.gender}
                        onChange={
                            (e) => this.setState({ gender: e.target.value })
                        }
                        />
                    <br/>

                    Pronouns <br /> {this.props.errors.pronouns} <br/>
                    <input 
                        type="text" 
                        value={this.state.pronouns}
                        onChange={
                            (e) => this.setState({ pronouns: e.target.value })
                        }
                    />
                    <br/>

                    <button onClick={this.handleSubmit}>Sign Up</button>

                </form>

            </div>
        )
    }
}

const msp = state => ({
    errors: state.errors.session
})

const mdp = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    createSession: credentials => dispatch(createSession(credentials))
})

const NewUserFormContainer = connect(msp, mdp)(NewUserForm);

export default NewUserFormContainer;