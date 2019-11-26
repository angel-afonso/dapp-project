import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Context } from '../../utils/context';
import Ipfs from 'ipfs';
import { getWeb3 } from '../../utils/getWeb3';
import "./App.css";

const Home = lazy(() => import('../Home/Home'));
const AddFile = lazy(() => import('../AddFile/AddFile'));
const Test = lazy(() => import('../Test/Test'));

class App extends Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      ipfs: null,
    };
  }

  async componentDidMount() {
    let web3 = await getWeb3();
    let ipfs = await Ipfs.create();

    this.setState({
      web3, ipfs
    });
  }

  render() {
    return !this.state.web3 ? <Loader /> : (
      <Router>
        <Context.Provider value={this.state}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/save" component={AddFile} />
              <Route exact path="/list" component={AddFile} />
              <Route exact path="/test" component={Test} />
            </Switch>
          </Suspense>
        </Context.Provider>
      </Router>
    );
  }
}

export default App;
