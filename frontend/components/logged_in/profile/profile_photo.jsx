import React from 'react';
import { withRouter } from 'react-router-dom';

class ProfilePhoto extends React.Component {
    constructor(props) {
        super(props)
        this.id = Math.random();
    }

    render(){        
        return(
            <img id={this.id} src={this.props.url} className="profile-photo not-resized" />
        );
    }
}

export default withRouter(ProfilePhoto);