import React from 'react';
import HomeContainer from './home';
import { Route, Switch } from 'react-router-dom'

const App = () => (
    <Switch >
        <Route path="/" component={HomeContainer}/>
    </Switch>
)

export default App;