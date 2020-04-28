import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './profile/profile';
import NewsFeed from './news_feed/news_feed';
import UserIndex from './users_index/user_index';
import LeftPanel from './left_panel/left_panel';
import { connect } from 'react-redux';

const LoggedInHome = ({ currentUser }) => (
    <Switch>
        <Route path="/users" component={UserIndex} />
        <Route path="/:username" component={Profile} />
        <Route path="/" component={NewsFeed} />
    </Switch>
);

const msp = state => ({
    currentUser: state.entities.users[state.session.username]
})

export default connect(msp, null)(LoggedInHome);