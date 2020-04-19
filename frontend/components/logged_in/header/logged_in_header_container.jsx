import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { deleteSession } from '../../../actions/session_actions'


class LoggedInHeader extends React.Component {
    constructor(props){
        super(props)
        this.goHome = this.goHome.bind(this)
    }

    handleSignout(e) {
        this.props.deleteSession()
        .then(() => this.props.history.push("/"))
    }

    goHome(e) {
        this.props.location.pathname === "/" ? 
        window.location.reload(false) : this.props.history.push("/")
    }





    render(){
        return(
            <div 
                className="logged-in-header"
                >
                <div className="nav">

                    <div className="left-nav">
                        <div 
                            className="logo"
                            onClick={this.goHome}
                        >
                        </div>

                        <div className="input-container">
                            <input type="text" placeholder="Search"/>
                            <div className="search-button"></div>
                        </div>
                    </div>

                   
                    <div className="middle-nav">
                        
                        <Link 
                            to={`/${this.props.currentUser.username}`}
                            className="profile link"
                        >

                            <img src={this.props.currentUser.profilePhotoUrl} className="profile-photo">
                            </img>

                            {this.props.currentUser.firstName}

                        </Link>

                        <div className="middle-nav-right-border"></div>

                        <div 
                            onClick={this.goHome}
                            className="home link"
                        >
                            Home
                        </div>

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
                            <div 
                                className="friend-icon sprite unselected"
                            >
                                <ul>
                                    <li>
                                        Friend requests
                                    </li>
                                </ul>
                            </div>

                            <div 
                                className="message-icon sprite unselected"
                                >
                                <ul>
                                    <li>
                                        Messages
                                    </li>
                                </ul>
                            </div>

                            <div 
                                className="bell-icon sprite unselected"
                            >
                                <ul>
                                    <li>
                                        Notifications
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="middle-nav-right-border"></div>
                    </div>

                    <div 
                        className="info-icon sprite unselected"
                    >
                    </div>

                    <div 
                        className="arrow-icon sprite unselected"
                    >
                        <ul>
                            <li onClick={(e) => this.handleSignout(e)}>
                                Sign Out
                            </li> 
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

const msp = state => ({
    currentUser: state.entities.users[state.session.username]
})

const mdp = dispatch => ({
    deleteSession: () => dispatch(deleteSession())
})

const LoggedInHeaderContainer =  withRouter(connect(msp, mdp)(LoggedInHeader));

export default LoggedInHeaderContainer;