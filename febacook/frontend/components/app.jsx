import React from 'react';
import HomeContainer from './home';
import { Route, Switch } from 'react-router-dom'
import HeaderContainer from './header';

const App = () => (
    <div>
        <HeaderContainer /> 
        <Switch >
            <Route path="/" component={HomeContainer}/>
        </Switch>
    </div>
)

export default App;