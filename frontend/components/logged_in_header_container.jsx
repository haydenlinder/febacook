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

                    <div className="left-nav">
                        <div className="logo">
                        </div>

                        <div className="input-container">
                            <input type="text" placeholder="I'm a text box"/>
                            <div className="search-button">o-</div>
                        </div>
                    </div>

                   
                    <div className="middle-nav">
                        
                        <Link 
                            to={`/${this.props.currentUser.username}`}
                            className="profile link"
                        >

                            <div className="profile-photo">
                                img
                            </div>

                            {this.props.currentUser.firstName}

                        </Link>

                        <div className="middle-nav-right-border"></div>

                        <Link 
                            to="/users"
                            className="home link"
                        >
                            Home
                        </Link>

                        <div className="middle-nav-right-border"></div>
                        
                        <Link 
                            to="/users"
                            className="find-friends link"
                        >
                            Find Friends
                        </Link>

                        <div className="middle-nav-right-border"></div>

                        <Link 
                            to="/"
                            className="create link"
                        >
                            Create
                        </Link>

                        <div className="middle-nav-right-border"></div>

                        <div className="notifications-container">
                            <div className="friend-icon sprite">
                                88
                            </div>

                            <div className="message-icon sprite">
                                msg
                            </div>

                            <div className="bell-icon sprite">
                                A
                            </div>
                        </div>
                    </div>
                    <div className="middle-nav-right-border"></div>

                    <div className="git-icon sprite">
                        G
                    </div>

                    <div className="arrow-icon sprite dropdown">
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