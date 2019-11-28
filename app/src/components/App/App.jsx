import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { Context } from '../../utils/context';
import Ipfs from 'ipfs';
import { getWeb3 } from '../../utils/getWeb3';
import StorageContract from '../../contracts/Storage.json';
import "./App.css";

const Home = lazy(() => import('../Home/Home'));
const AddFile = lazy(() => import('../AddFile/AddFile'));
const List = lazy(() => import('../List/List'));
const View = lazy(() => import('../View/View'));


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

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = StorageContract.networks[networkId];

    const contract = new web3.eth.Contract(
      StorageContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

    this.setState({
      web3, ipfs, accounts, contract
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
              <Route exact path="/list" component={List} />
              <Route exact path="/view/:index" component={View} />
            </Switch>
          </Suspense>
        </Context.Provider>
      </Router>
    );
  }
}

export default App;
