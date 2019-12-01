import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { BigNumber } from "bignumber.js";
import { showNotification, closeShareModal } from "../../actions/ui";
import Loader from "../Loader/Loader";
import "./ShareModal.css";

const currency = {
    wei: new BigNumber(10 ** 18),
    finney: new BigNumber(10 ** 15),
    ether: new BigNumber(1),
};


class ShareModal extends React.Component {
    constructor() {
        super();
        this.state = {
            addresses: [{
                disabled: false,
                value: "",
            }],
            loading: true,
        };
        this.oldAddresses = [];
        this.addressesToRemove = [];
        this.addInput = this.addInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }

    async componentDidMount() {
        const { index, storage, accounts } = this.props;
        this.oldAddresses = await storage.methods.getFileSharedAddresses(index).call({ from: accounts[0] });
        this.setState({
            addresses: this.oldAddresses.length > 0 ? [...this.oldAddresses.map((value) => ({
                disabled: true,
                value,
            })), { disabled: false, value: "" }] : [{
                disabled: false,
                value: "",
            }], loading: false
        })
    }

    addInput() {
        this.setState({
            addresses: [...this.state.addresses, ""],
        })
    }

    handleChange(index) {
        return ({ target }) => {
            this.setState((state) => {
                state.addresses[index] = target.value;
                return state;
            });
        }
    }

    async handleAccept() {
        const { accounts, storage, index, showNotification } = this.props;
        await storage.methods.addAddressToShare(this.state.addresses, index.toString()).send({ from: accounts[0] });
        showNotification("File shared successfully")
    }

    removeAddress(index) {
        return () => {
            let oldAddress = this.oldAddresses.find((address) => address === this.state.addresses[index].value);

            if (oldAddress) {
                this.addressesToRemove.push(oldAddress);
            }
            this.setState((state) => {
                state.addresses.splice(index, 1);
                return state;
            });
        }
    }

    render() {
        return this.state.loading ? <Loader /> : ReactDOM.createPortal(
            <div className="share-modal">
                <div className="share-modal__container">
                    <div className="share-modal__close-container" onClick={this.props.closeShareModal}>
                        <p>X</p>
                    </div>
                    <p>Share with:</p>
                    <div className="share-modal__input-container">
                        {
                            this.state.addresses.map((input, index) => (
                                <div className="share-modal__input-wrapper" key={index} >
                                    <input placeholder="Address" {...input} onChange={this.handleChange(index)} name={`address-${index}`} />
                                    {
                                        <div className="close" onClick={this.removeAddress(index)}>
                                            <p>x</p>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="share-modal__buttons">
                        <div>
                            <button className="share-modal__accept-plus" onClick={this.addInput}>
                                +
                            </button>
                        </div>
                        <div>
                            <button className="share-modal__accept-btn" onClick={this.handleAccept}>Accept</button>
                        </div>
                    </div>
                </div>
            </div>
            , document.body);

    }
}


export default connect((state) => ({
    storage: state.contract.storage,
    accounts: state.contract.accounts,
    index: state.ui.shareIndex
}), { showNotification, closeShareModal })(ShareModal);



