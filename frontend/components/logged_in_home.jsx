import React from 'react';

const LoggedInHome = (props) => {
    return( <h1>{props.currentUser.firstName}'s Feed</h1> )
}

export default LoggedInHome;