import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from '../profile/profile_photo';
import { updateFriendship, deleteFriendship } from '../../../actions/friendship_actions';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';

class FriendRequests extends React.Component {
    constructor(props) {
        super(props);

    }

    handleFriend(username, accepted) {
        const { updateFriendship, deleteFriendship, currentUser, fetchUser } = this.props;
        const id = currentUser.receivedFriendRequests[username][1];
        if (accepted) return updateFriendship({ friendship: { accepted: true }, id: id }).then(() => fetchUser(currentUser.username));
        return deleteFriendship(id).then(() => fetchUser(currentUser.username));
    }

    render() {
        const { users } = this.props;
        return (
            <div className="friend-dropdown-index-container">
                <div className="user-index-content">
                    <div className="user-index-title">Friend Requests</div>
                    {users.map(user =>
                        <div className="user-item-container">
                            <div className="user-item-content">
                                <div className="friend-dropdown photo-container">
                                    <ProfilePhoto url={user.profilePhotoUrl} />
                                </div>
                                <div className="friend-dropdown user-item-info">
                                    <Link to={`/${user.username}#top`}>{user.firstName} {user.lastName}</Link>
                                    <div className="friend-dropdown-buttons">
                                        <div className="friend-dropdown-button" onClick={e => this.handleFriend(user.username, true)}>Accept</div>
                                        <div className="friend-dropdown-button" onClick={e => this.handleFriend(user.username, false)}>Deny</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mdp = dispatch => ({
    updateFriendship: friendship => dispatch(updateFriendship(friendship)),
    deleteFriendship: id => dispatch(deleteFriendship(id)),
    fetchUser: username => dispatch(fetchUser(username)) 
})

export default connect(null, mdp)(FriendRequests);