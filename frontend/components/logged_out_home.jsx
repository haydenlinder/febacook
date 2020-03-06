import React from 'react';
import LoggedOutGreeting from './logged_out_greeting';
import NewUserFormContainer from './new_user_form_container';

const LoggedOutHome = () => (
    <div className="logged-out-home-container">
        <div className="logged-out-home">
            <LoggedOutGreeting />
            <NewUserFormContainer />
        </div>
    </div>
)

export default LoggedOutHome;