import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { deleteSession } from '../actions/session_actions'


class LoggedInHeader extends React.Component {
    constructor(props){
        super(props)

    }

    handleSignout(e) {
        this.props.deleteSession()
        .then(() => this.props.history.push("/"))
    }

    render(){
        return(
            <div className="logged-in-header">
                <div className="nav">

                    <div className="logo">
                        <Link to="/">f</Link>
                    </div>

                    <div className="input-container">
                        <input type="text" placeholder="I'm a text box"/>
                        <div className="search-button">o-</div>
                    </div>

                   
                    <div className="links-container">

                        <div className="profile link">
                            <Link to={`/${this.props.currentUser.username}`}>
                                {this.props.currentUser.firstName}
                            </Link>
                            <div className="profile-photo">
                                img
                            </div>
                        </div>

                        <div className="home link">
                            <Link to="/users">Home</Link>
                        </div>

                        <div className="find-friends link">
                            <Link to="/users">Find Friends</Link>
                        </div>

                        <div className="create link">
                            Create
                        </div>

                        <div className="link">
                            <div className="notifications-container">
                                <div className="friend-icon notification">
                                    88
                                </div>

                                <div className="message-icon notification">
                                    msg
                                </div>

                                <div className="bell-icon notification">
                                    A
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="git-icon notification">
                        G
                    </div>

                    <div className="arrow-icon notification dropdown">
                        V
                        <li onClick={(e) => this.handleSignout(e)}>Sign Out</li> 
                    </div>

                </div>
            </div>
        )
    }
}

const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mdp = dispatch => ({
    deleteSession: () => dispatch(deleteSession())
})

const LoggedInHeaderContainer =  withRouter(connect(msp, mdp)(LoggedInHeader));

export default LoggedInHeaderContainer;