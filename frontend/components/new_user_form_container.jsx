import React from 'react';
import { connect } from 'react-redux';

import { 
    createUser, 
    createSession, 
    clearSessionErrors,
    clearAllSessionErrors
} from '../actions/session_actions';

class NewUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: "", password: "", email: "",
                first_name: "", last_name: "",
                birthday: "", gender: "", pronouns: ""
            },
            customGender: "custom-gender-false"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearErrors = this.clearErrors.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.clearAllSessionErrors();
        if (e.target.id === "new") {
            this.props.createUser(this.state.user)
            .fail(() => this.setState({ errors: this.props.errors }));
        } else {
            this.props.createSession({
                email: "user1@email.com", password: "password"
            });
        }

    }

    clearErrors(errors) {
        this.props.clearSessionErrors(["login",...errors])
    }

    render() {
        return(
            <form className="user-form">

                <div className="message">
                    <div className="signup"> Sign Up </div>
                    <div className="line2">
                        <div className="easy"> It's quick and easy. </div>
                        <button id="demo" className="demo login" onClick={this.handleSubmit}> Try it out </button>
                    </div>
                </div>

                <div className="input name">

                    <div className={`${(this.props.errors.first_name || this.props.errors.last_name) ? "errors" : "no-errors"}`}>
                        First and last name required
                            </div>
                    <input
                        type="text"
                        placeholder="First name"
                        value={this.state.user.first_name}
                        onClick={(e) => {
                            this.clearErrors(["first_name", "last_name"])
                        }}
                        onChange={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { first_name: e.target.value })
                                this.setState(nextState)
                            }
                        }
                    />

                    <input
                        type="text"
                        placeholder="Last name"
                        value={this.state.user.last_name}
                        onClick={(e) => {
                            this.clearErrors(["first_name", "last_name"])
                        }}
                        onChange={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { last_name: e.target.value })
                                this.setState(nextState)
                            }
                        }
                    />
                </div>

                <div className="input">
                    <div className={this.props.errors.email ? "errors" : "no-errors"}>
                        {this.props.errors.email ? "Email " + this.props.errors.email[0] : ""}
                    </div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={this.state.user.email}
                        onClick={(e) => {
                            this.clearErrors(["email"])
                        }}
                        onChange={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { email: e.target.value })
                                this.setState(nextState)
                            }
                        }
                    />
                </div>


                <div className="input">
                    <div className={this.props.errors.password ? "errors" : "no-errors"}>
                        Password {this.props.errors.password}
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.user.password}
                        onClick={(e) => {
                            this.clearErrors(["password"])
                        }}
                        onChange={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { password: e.target.value })
                                this.setState(nextState)
                            }
                        }
                    />
                </div>

                <div className="input">
                    <div className={this.props.errors.username ? "errors" : "no-errors"}>
                        Username {this.props.errors.username}
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={this.state.user.username}
                        onClick={(e) => this.clearErrors(["username"])}
                        onChange={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { username: e.target.value })
                                this.setState(nextState)
                            }
                        }
                    />
                </div>

                <div className="input">
                    <div className="birthday-container">
                        <div>
                            Birthday
                                </div>
                        <div className={this.props.errors.birthday ? "errors" : "no-errors"}>
                            Birthday {this.props.errors.birthday}
                        </div>
                        <input
                            type="date"
                            placeholder="1/1/1993"
                            value={this.state.user.birthday}
                            onClick={(e) => this.clearErrors(["birthday"])}
                            onChange={
                                (e) => {
                                    let nextState = Object.assign(this.state.user, { birthday: e.target.value })
                                    this.setState(nextState)
                                }
                            }
                        />
                    </div>
                </div>

                Gender
                <div
                    className="gender-input-container input"
                    onClick={(e) => this.clearErrors(["gender"])}
                >
                    <div className={this.props.errors.gender ? "errors" : "no-errors"}>
                        Please select gender
                    </div>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        onClick={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { gender: e.target.value, pronouns: "she/her/hers" })

                                this.setState({ user: nextState, customGender: "custom-gender-false" })
                            }
                        }
                    /><div className="title">Female</div>



                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        onClick={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { gender: e.target.value, pronouns: "he/him/his" })

                                this.setState({ user: nextState, customGender: "custom-gender-false" })
                            }
                        }
                    /><div className="title">Male</div>



                    <input
                        type="radio"
                        name="gender"
                        value="none "
                        onClick={
                            (e) => {
                                let nextState = Object.assign(this.state.user, { gender: e.target.value, pronouns: "" })

                                this.setState({ user: nextState, customGender: "custom-gender-true" })
                            }
                        }
                    /><div className="title">Custom</div>
                </div>

                <div className={this.state.customGender}>

                    <div className="input">
                        <div className={this.props.errors.pronouns ? "errors" : "no-errors"}>
                            Please select pronoun
                        </div>
                        <select
                            type="text"
                            value={this.state.user.pronouns}
                            onClick={(e) => this.clearErrors(["pronouns"])}
                            onChange={
                                (e) => {
                                    let nextState = Object.assign(this.state.user, { pronouns: e.target.value })
                                    this.setState(nextState)
                                }
                            }
                        >
                            <option default disabled value="">Select your pronoun</option>
                            <option value="she/her/hers">She: "Wish her a happy birthday!"</option>
                            <option value="he/him/his">He: "Wish him a happy birthday!"</option>
                            <option value="they/them/theirs">They: "Wish them a happy birthday!"</option>

                        </select>
                    </div>

                    <div className="input">
                        <input
                            type="text"
                            placeholder="Gender (optional)"
                            value={this.state.user.gender === "none " ? "" : this.state.user.gender}
                            onClick={(e) => this.clearErrors(["gender"])}
                            onChange={
                                (e) => {
                                    let nextState = Object.assign(this.state.user, { gender: e.target.value })
                                    this.setState(nextState)
                                }
                            }
                        />
                    </div>

                </div>

                <div className="button-container">
                    <div id="new" className="sign-up-button" onClick={this.handleSubmit}>Sign Up</div>
                </div>

                <div className="line"></div>

            </form>
        )
    }
}

const msp = (state) => ({
    errors: state.errors.session,
})

const mdp = dispatch => ({
    createUser: user => dispatch(createUser(user)),
    createSession: credentials => dispatch(createSession(credentials)),
    clearSessionErrors: (errors) => dispatch(clearSessionErrors(errors)),
    clearAllSessionErrors: () => dispatch(clearAllSessionErrors())
})

const NewUserFormContainer = connect(msp, mdp)(NewUserForm);

export default NewUserFormContainer;