import React from 'react';
import { connect } from 'react-redux';
import Feed from './feed';
import SessionFormContainer from './session_form';

const Home = ({ currentUser }) => {
    return currentUser ? <Feed /> : <SessionFormContainer /> 
}

const msp = state => ({
    currentUser: state.users[state.session.id]
})

const HomeContainer = connect(msp)(Home);

export default HomeContainer;