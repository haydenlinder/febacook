import React from 'react';
import { Route } from 'react-router-dom';
import ProfileContainer from './profile_container';

const LoggedInHome = (props) => (
    <Route path="/:username" component={ProfileContainer} />
)

export default LoggedInHome;