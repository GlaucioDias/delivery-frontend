import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Purchase from './pages/Purchase';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/purchase' component={Purchase} />
        </Switch>
    </BrowserRouter>
)
export default Routes;