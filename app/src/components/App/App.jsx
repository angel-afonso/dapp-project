import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
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
import { setContent, updateIndexes, setAccounts } from "../../actions/contract";
import "./App.css";
import PopUp from "../PopUp/PopUp";
import { ReactComponent as Upload } from "../../assets/img/upload-solid.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      web3: null,
      ipfs: null,
      newFile: false,
      contract: null,
      accounts: [],
      error: false,
    };

    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.openUploadModal = this.openUploadModal.bind(this);
  }

  async componentDidMount() {
    const { setContent, updateIndexes, setAccounts } = this.props;
    let web3
    try {
      web3 = await getWeb3();
    } catch (error) {
      this.setState({ error: true });
      return;
    }
    try {
      let ipfs = await Ipfs.create();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = StorageContract.networks[networkId];

      const contract = new web3.eth.Contract(
        StorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      contract.events.StoredFile().on("data", () => { updateIndexes(contract, accounts[0]) });
      window.ethereum.on('accountsChanged', setAccounts);
      setContent(web3, ipfs, contract, accounts);
    } catch (error) {
      this.setState({ error: true });
    }

  }


  closeUploadModal() {
    this.setState({ newFile: false });
  }

  openUploadModal() {
    this.setState({ newFile: true });
  }

  render() {
    const { newFile, error } = this.state;
    const { web3, notification, share, location: { pathname } } = this.props;
    if (error) {
      return (
        <div className="errorContainer">
          <Logo />
          <h3 className="errorMessage">You need to have MetaMask installed to use the application</h3>
        </div>
      )
    }

    return !web3 ? <Loader /> : (
      <div className="app">
        {newFile && <AddFile closeModal={this.closeUploadModal} />}
        {share && <ShareModal />}
        {this.props.delete && <DeleteModal />}
        {notification && <PopUp />}
        <div className="app__sidebar">
          <div className="app__logo">
            <Logo />
          </div>
          <div className="app__options">
            <Link className={"options__item--new " + (pathname === "/" ? "options__item--active" : "")} to="/">New</Link>
            <Link className={"options__item " + (pathname === "/shared" ? "options__item--active" : "")} to="/shared">Shared</Link>
            <button className="options__item" onClick={this.openUploadModal}><Upload />upload</button>
          </div>
        </div>
        <Routes />
      </div >
    );
  }
}

export default connect((state) => ({
  web3: state.contract.web3,
  notification: state.ui.showNotification,
  share: state.ui.showShareModal,
  delete: state.ui.showDeleteModal,
}), {
  setContent,
  updateIndexes,
  setAccounts
})(withRouter(App));
