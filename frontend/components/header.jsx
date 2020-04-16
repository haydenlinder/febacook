import React from 'react';
import { deleteSession } from '../actions/session_actions'
import { connect } from 'react-redux';
import LoggedOutHeaderContainer from './logged_out/logged_out_header_container';
import LoggedInHeaderContainer from './logged_in/header/logged_in_header_container';


let Header = ({ currentUser, deleteSession }) => {
    return currentUser ? 
        <LoggedInHeaderContainer />
        : <LoggedOutHeaderContainer />
}


const msp = state => ({
    currentUser: state.entities.users[state.session.username]
})

const mdp = dispatch => ({
    deleteSession: () => dispatch(deleteSession())
})

Header = connect(msp, mdp)(Header)

export default Header;