import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { deleteSession } from '../../../actions/session_actions'
import ProfilePhoto from '../profile/profile_photo';
import { fetchUsers, fetchUser } from '../../../actions/user_actions';
import LeftPanel from '../left_panel/left_panel';
import RightPanel from '../left_panel/right_panel';
import FriendRequests from './friend_requests';

class LoggedInHeader extends React.Component {
    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
        this.state = {
            search: ''
        };
    }

    handleSignout(e) {
        this.props.deleteSession()
        .then(() => this.props.history.push("/"));
    }

    goHome(e) {
        this.props.location.pathname === "/" ? 
        window.location.reload(false) : this.props.history.push("/")
    }

    handleChange(e) {
        this.setState({ search: e.target.value })
    }

    handleSearch(e) {
        e.preventDefault();
        let params = new URLSearchParams();
        params.set('nameFragment', this.state.search);
        let qString = params.toString();
        this.props.history.push(`/users/search/?${qString}`);
    }

    friendRequestors() {
        const { users, currentUser } = this.props;
        const handles = currentUser.friendRequestHandles;
        let result = handles.map(handle => users[handle]);
        return result;
    }

    render(){
        const friendRequestors = this.friendRequestors();
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

                        <form onSubmit={e => this.handleSearch(e)} className="input-container">
                            <Route
                                path='/users'
                                render={() => <LeftPanel currentUser={this.props.currentUser} selected={"users"} />}
                            />
                            <Route
                                exact
                                path='/'
                                render={() => <LeftPanel currentUser={this.props.currentUser} selected={"feed"} />}
                            />

                            <input 
                                onChange={e => this.handleChange(e)} 
                                type="text" 
                                value={this.state.search} 
                                placeholder="Search"
                            />
                            <button 
                                className="search-button"
                            ></button>
                        </form>
                    </div>
                    <div className="middle-nav">
                        <Link 
                            to={`/${this.props.currentUser.username}#top`}
                            className="profile link"
                        >
                            <div className="header-link photo-container">
                                <ProfilePhoto url={this.props.currentUser.profilePhotoUrl} />
                            </div>

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
                        {/* <Link 
                            to="/"
                            className="create link"
                        >
                            Create
                        </Link> */}
                        <div className="middle-nav-right-border"></div>
                        <div className="notifications-container">
                            <div 
                                className="friend-icon sprite unselected"
                            >
                                {friendRequestors.length? 
                                <div className="notification-number">{friendRequestors.length}</div>:null
                                }
                                <Route path="/users" component={RightPanel} />
                                <Route exact path="/" component={RightPanel} />
                                <ul className="friend-requests-dropdown">
                                    {/* <li> */}
                                        {!friendRequestors.length || friendRequestors.includes(undefined) ?
                                        "No Friend requests"
                                        :
                                       <FriendRequests users={friendRequestors} currentUser={this.props.currentUser} />
                                        }
                                    {/* </li> */}
                                </ul>
                            </div>
                            <div 
                                className="message-icon sprite unselected"
                                >
                                <ul>
                                    <li>
                                       No Messages
                                    </li>
                                </ul>
                            </div>
                            <div 
                                className="bell-icon sprite unselected"
                            >
                                <ul>
                                    <li>
                                       No Notifications
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="middle-nav-right-border"></div>
                    </div>
                    <div 
                        className="info-icon sprite unselected"
                    >
                        <ul className="git-dropdown">
                            <a href="https://github.com/haydenlinder/febacook">
                                <li className="git-icon">

                                </li>
                            </a>
                        </ul>
                    </div>
                    <div 
                        className="arrow-icon sprite unselected"
                    >
                        <ul>
                            <li className="sign-out-button" onClick={(e) => this.handleSignout(e)}>
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
    currentUser: state.entities.users[state.session.username],
    users: state.entities.users 
});

const mdp = dispatch => ({
    deleteSession: () => dispatch(deleteSession()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUser: (username) => dispatch(fetchUser(username))
});

const LoggedInHeaderContainer =  withRouter(connect(msp, mdp)(LoggedInHeader));

export default LoggedInHeaderContainer;