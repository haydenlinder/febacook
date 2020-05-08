import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root")

    let store;
    if (window.currentUser) {
        const { currentUser } = window;
        const { username } = currentUser;
        const preloadedState = {
            entities: {
                users: {
                    [username]: currentUser
                }
            },
            session: { username: username }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }


    
    ReactDOM.render( <Root store={store}/>, root )
})
