import React, { Suspense, lazy } from "react";
import { Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Home = lazy(() => import('../Home/Home'));
const SharedFiles = lazy(() => import('../SharedFiles/SharedFiles'));

export default function Routes() {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/shared" component={SharedFiles} />
            </Switch>
        </Suspense>
    )
}