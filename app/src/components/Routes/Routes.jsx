import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Home = lazy(() => import('../Home/Home'));
// const AddFile = lazy(() => import('../AddFile/AddFile'));
// const List = lazy(() => import('../List/List'));
// const View = lazy(() => import('../View/View'));

export default function Routes() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <Route exact path="/save" component={AddFile} />
                    <Route exact path="/list" component={List} />
                    <Route exact path="/view/:index" component={View} /> */}
                </Switch>
            </Suspense>
        </Router>
    )
}