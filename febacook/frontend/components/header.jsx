import React from 'react';
import { deleteSession } from '../actions/session_actions'
import { connect } from 'react-redux';
import SessionFormContainer from './session_form';


const Header = ({ currentUser, deleteSession }) => {
    return currentUser ? 
        <button onClick={deleteSession}>Sign Out</button> 
        : <SessionFormContainer />
}


const msp = state => ({
    currentUser: state.entities.users[state.session.id]
})

const mdp = dispatch => ({
    deleteSession: () => dispatch(deleteSession())
})

const HeaderContainer = connect(msp, mdp)(Header)

export default HeaderContainer;