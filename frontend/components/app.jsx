import React from 'react';
import HomeContainer from './home';
import { Route, Switch } from 'react-router-dom'
import HeaderContainer from './header';

const toggleDropdowns = (e) => {

    const unselect = (target) => {
        target.classList.remove("selected");
        target.classList.add("unselected");
    }

    const select = (target) => {
        target.classList.remove("unselected");
        target.classList.add("selected");
    }

    const toggleOffTarget = (e) => {
        let selected = document.getElementsByClassName("selected");
        let pending = false
        if (e.target.classList.contains("unselected")) {
            pending = true
        }
        for (let i = 0; i < selected.length; i++) {
            unselect(selected[i]);
        }
        if (pending) select(e.target);

    }

    toggleOffTarget(e);
}


const App = () => (
    <div 
        className="app-container"
        onClick={toggleDropdowns}
    >
        <HeaderContainer /> 
        <Switch >
            <Route path="/" component={HomeContainer}/>
        </Switch>
    </div>
)

export default App;