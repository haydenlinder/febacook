import React from 'react';
import HomeContainer from './home';
import { Route, Switch } from 'react-router-dom';
import HeaderContainer from './header';
import { closeModalBackground, toggleDropdowns } from '../util/ui_util';


const App = () => (
    <div 
        className="app-container"
        onClick={toggleDropdowns}
    >
        <div
            className="modal-false"
            onClick={closeModalBackground}
        ></div>
        <HeaderContainer /> 
        <Switch >
            <Route path="/" component={HomeContainer}/>
        </Switch>
    </div>
)

export default App;