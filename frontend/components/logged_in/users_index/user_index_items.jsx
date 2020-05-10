import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from '../profile/profile_photo';

class UserIndexItems extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { users } = this.props;
        return(
            <div className="friend-index-container">
                <div className="user-index-content">
                    <div className="user-index-title">Friends</div>
                    {users.map(user =>
                        <div className="user-item-container">
                            <div className="user-item-content">
                                <div className="photo-container user-index">
                                    <ProfilePhoto url={user.profilePhotoUrl} />
                                </div>
                                <div className="user-item-info">
                                    <Link to={`/${user.username}#top`}>{user.firstName} {user.lastName}</Link>
                                    <div className="user-item-bio">{user.bio}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default UserIndexItems;