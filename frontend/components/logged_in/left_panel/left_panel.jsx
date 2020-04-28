import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePhoto from '../profile/profile_photo';

const LeftPanel = ({ currentUser, selected }) => {
    return(
        <div className="sides-container">

            <div className="left-panel-container">
                <div className="left-panel-content">
                    <Link to={`/${currentUser.username}`} className={`left-panel-link profile`}>
                        <div className="photo-container left-panel">
                            <ProfilePhoto url={currentUser.profilePhotoUrl} />
                        </div>
                        <span>
                            {currentUser.firstName} {currentUser.lastName}
                        </span>
                    </Link>
                    <Link to={`/`} className={`left-panel-link ${selected === 'feed' ? 'selected' : null}`}>
                        <div>
                        🗞 News Feed
                        </div>
                    </Link>
                    <Link to={`/users`} className={`left-panel-link ${selected === 'users' ? 'selected' : null}`}>
                        <div>
                        🔍 Find Friends
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default LeftPanel;