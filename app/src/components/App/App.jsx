import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Loader from '../Loader/Loader';
import Ipfs from 'ipfs';
import { getWeb3 } from '../../utils/getWeb3';
import StorageContract from '../../contracts/Storage.json';
import Routes from "../Routes/Routes";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import AddFile from "../AddFile/AddFile";
import ShareModal from "../ShareModal/ShareModal";
import DeleteModal from "../DeleteFile/DeleteModal";
import { connect } from "react-redux";
import { setContent } from "../../actions/contract";
import "./App.css";
import PopUp from "../PopUp/PopUp";

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
    const { setContent } = this.props;
    let web3 = await getWeb3();
    let ipfs = await Ipfs.create();

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = StorageContract.networks[networkId];

    const contract = new web3.eth.Contract(
      StorageContract.abi,
      deployedNetwork && deployedNetwork.address,
    );

    setContent(web3, ipfs, contract, accounts);
  }


  closeUploadModal() {
    this.setState({ newFile: false });
  }

  openUploadModal() {
    this.setState({ newFile: true });
  }

  render() {
    const { newFile } = this.state;
    const { web3, notification, share } = this.props;
    return !web3 ? <Loader /> : (
      <div className="app">
        <Router>
          {newFile && <AddFile closeModal={this.closeUploadModal} />}
          {share && <ShareModal />}
          {this.props.delete && <DeleteModal />}
          {notification && <PopUp />}
          <div className="app__sidebar">
            <div className="app__logo">
              <Logo />
            </div>
            <div className="app__options">
              <Link className="options__item--new" to="/">New</Link>
              <Link className="options__item" to="/shared">Shared</Link>
              <button className="options__item" onClick={this.openUploadModal}>upload</button>
            </div>
          </div>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default connect((state) => ({
  web3: state.contract.web3,
  notification: state.ui.showNotification,
  share: state.ui.showShareModal,
  delete: state.ui.showDeleteModal,
}), {
  setContent
})(App);
