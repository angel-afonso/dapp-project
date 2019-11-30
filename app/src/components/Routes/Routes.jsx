import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Home = lazy(() => import('../Home/Home'));

export default function Routes() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Suspense>
        </Router>
    )
}