import React from 'react';
import Home from './home';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import { closeModal, toggleDropdowns } from '../util/ui_util';


const App = () => (
    <div 
        className="app-container"
        onClick={toggleDropdowns}
    >
        <div
            id="background-modal"
            className="modal-hide"
            onClick={() => {
                closeModal('background-modal');
                closeModal('edit-profile-modal')
            }}
        ></div>
        <Header /> 
        <Switch >
            <Route path="/" component={Home}/>
        </Switch>
    </div>
)

export default App;