import React, { Component, Suspense, lazy } from "react";
import Loader from '../Loader/Loader';
import Ipfs from 'ipfs';
import { getWeb3 } from '../../utils/getWeb3';
import StorageContract from '../../contracts/Storage.json';
import Routes from "../Routes/Routes";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import AddFile from "../AddFile/AddFile";
import "./App.css";
import { Context } from "../../utils/context";

class App extends Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      ipfs: null,
      newFile: false,
      contract: null,
      accounts: [],
    };

    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
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


  closeUploadModal() {
    this.setState({ newFile: false });
  }

  openUploadModal() {
    this.setState({ newFile: true });
  }

  render() {
    const { newFile, web3, ipfs, contract, accounts } = this.state;
    return !web3 ? <Loader /> : (
      <div className="app">
        <Context.Provider value={{ web3, ipfs, contract, accounts }}>

          {newFile && <AddFile closeModal={this.closeUploadModal} />}
          <div className="app__sidebar">
            <div className="app__logo">
              <Logo />
            </div>
            <div className="app__options">
              <button className="options__item--new" onClick={this.openUploadModal}>New</button>
              <button className="options__item">Shared</button>
              <button className="options__item">upload</button>
            </div>
          </div>
          <Routes />
        </Context.Provider>
      </div>
    );
  }
}

export default App;
