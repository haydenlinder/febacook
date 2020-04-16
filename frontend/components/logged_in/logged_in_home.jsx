import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './profile/profile';

const LoggedInHome = (props) => (
    <Switch>

        <Route path="/:username" component={Profile} />
    </Switch>
)

export default LoggedInHome;