import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProfileContainer from './profile_container';

const LoggedInHome = (props) => (
    <Switch>
        <Route path="/:username" component={ProfileContainer} />
    </Switch>
)

export default LoggedInHome;