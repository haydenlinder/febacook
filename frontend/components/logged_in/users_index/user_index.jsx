import React from 'react';
import { fetchUsers, fetchUsersByNameFragment } from '../../../actions/user_actions';
import { connect } from 'react-redux';
import ProfilePhoto from '../profile/profile_photo';
import { HashLink as Link } from 'react-router-hash-link';

class UserIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.update();
    }

    componentDidUpdate(prevProps){
        if (this.props.location.search !== prevProps.location.search) {
            this.update();
        }
    }

    update() {
        let search = this.props.location.search;
        let params = new URLSearchParams(search.slice(1)); 
        let nameFragment = params.get('nameFragment');
        if (nameFragment) {
            this.props.fetchUsersByNameFragment(nameFragment)
            .then(action => {
                if (action.users) {
                    this.setState({ users: Object.values(action.users) });
                } else {
                    this.setState({ users: [] });
                }
            });
        } else {
            this.props.fetchUsers().then(action => this.setState({ users: Object.values(action.users) }))
        }
    }

    render() {
        return(
            <div className="user-index-container">
                <div className="user-index-content">
                    <div className="user-index-title">People</div>
                {this.state.users.map(user =>
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
    fetchUsers: () => dispatch(fetchUsers()),
    fetchUsersByNameFragment: nameFragment => 
        dispatch(fetchUsersByNameFragment(nameFragment)),
})

UserIndex = connect(msp, mdp)(UserIndex);

export default UserIndex;