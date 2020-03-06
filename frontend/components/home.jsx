import React from 'react';
import { connect } from 'react-redux';
import LoggedInHome from './logged_in_home';
import LoggedOutHome from './logged_out_home';

const Home = ({ currentUser }) => {
    return(
        currentUser ? <LoggedInHome currentUser={currentUser}/> : <LoggedOutHome /> 
    )
}

const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const HomeContainer = connect(msp)(Home);

export default HomeContainer;