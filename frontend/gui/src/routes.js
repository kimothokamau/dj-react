import React from 'react';
import { Route } from 'react-router-dom';

import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView';
import Login from './containers/Login';
import Buy from './containers/Buy';
import Signup from './containers/Signup';


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArticleList} />
        <Route exact path='/article/:articleID' component={ArticleDetail} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/buy' component={Buy} />
        <Route exact path='/signup' component={Signup} />
    </div>
);

export default BaseRouter;