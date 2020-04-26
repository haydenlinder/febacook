import React from 'react';
import { fetchUsers } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import ProfilePhoto from '../profile/profile_photo';
import { HashLink as Link } from 'react-router-hash-link';

class UserIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        let search = this.props.location.search;
        let params = new URLSearchParams(search.slice(1));
        this.props.fetchUsers();
    }

    render() {
        return(
            <div className="user-index-container">
                <div className="user-index-content">
                    <div className="user-index-title">People</div>
                {this.props.users.map(user =>
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

const msp = state => ({
    users: Object.values(state.entities.users)
});

const mdp = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers())
})

UserIndex = connect(msp, mdp)(UserIndex);

export default UserIndex;