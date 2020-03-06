import React from 'react';
import { connect } from 'react-redux';
import LoggedInHome from './logged_in_home';
import LoggedOutHomeContainer from './logged_out_home_container';

const Home = ({ currentUser }) => {
    console.log("home rerender")
    return(
        currentUser ? <LoggedInHome currentUser={currentUser}/> : <LoggedOutHomeContainer /> 
    )
}

const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const HomeContainer = connect(msp)(Home);

export default HomeContainer;