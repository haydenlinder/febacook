import React from 'react';
import { connect } from 'react-redux';
import Feed from './feed';
import NewUserFormContainer from './new_user_form';

const Home = ({ currentUser }) => {
    console.log("home rerender")
    return(
        currentUser ? <Feed currentUser={currentUser}/> : <NewUserFormContainer /> 
    )
}

const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const HomeContainer = connect(msp)(Home);

export default HomeContainer;