import React from 'react';
import Home from './home';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
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
        <Header /> 
        <Switch >
            <Route path="/" component={Home}/>
        </Switch>
    </div>
)

export default App;