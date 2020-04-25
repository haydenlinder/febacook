import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './profile/profile';
import NewsFeed from './news_feed/news_feed';
import UserIndex from './users_index/user_index';

const LoggedInHome = (props) => (
    <Switch>
        <Route path="/users" component={UserIndex} />
        <Route path="/:username" component={Profile} />
        <Route path="/" component={NewsFeed} />
    </Switch>
);

export default LoggedInHome;