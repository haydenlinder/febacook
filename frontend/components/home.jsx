import React from 'react';
import { connect } from 'react-redux';
import LoggedInHome from './logged_in/logged_in_home';
import LoggedOutHome from './logged_out/logged_out_home';

let Home = ({ currentUser }) => {
    return(
        currentUser ? <LoggedInHome /> : <LoggedOutHome /> 
    )
}

const msp = state => ({
    currentUser: state.entities.users[state.session.username]
})

Home = connect(msp)(Home);

export default Home;