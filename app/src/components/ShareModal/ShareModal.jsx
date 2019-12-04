import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { BigNumber } from "bignumber.js";
import { showNotification, closeShareModal } from "../../actions/ui";
import Loader from "../Loader/Loader";
import "./ShareModal.css";

const ether = new BigNumber(10 ** 18)

class ShareModal extends React.Component {
    constructor() {
        super();
        this.state = {
            addresses: [{
                disabled: false,
                value: "",
            }],
            hasAmount: false,
            loading: true,
            amount: 0,
        };
        this.oldAddresses = [];
        this.addressesToRemove = [];
        this.addInput = this.addInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    async componentDidMount() {
        const { index, storage, accounts } = this.props;
        this.oldAddresses = await storage.methods.getFileSharedAddresses(index).call({ from: accounts[0] });
        let { 2: amount } = await storage.methods.getFile(index).call({ from: accounts[0] });
        this.setState({
            addresses: this.oldAddresses.length > 0 ? [...this.oldAddresses.map((value) => ({
                disabled: true,
                value,
            })), { disabled: false, value: "" }] : [{
                disabled: false,
                value: "",
            }], loading: false,
            amount: new BigNumber(amount).dividedBy(ether).toString(),
            hasAmount: amount > 0,
        })
    }

    handleCheck({ target }) {
        this.setState({ hasAmount: target.checked });
    }

    addInput() {
        this.setState({
            addresses: [...this.state.addresses, { disable: false, value: "" }],
        })
    }

    handleChange(index) {
        return ({ target }) => {
            this.setState((state) => {
                state.addresses[index].value = target.value;
                return state;
            });
        }
    }

    handleAmountChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    async handleAccept() {
        const { accounts, storage, index, showNotification } = this.props;
        this.setState({ loading: true });
        await storage.methods.addAddressToShare(
            this.state.addresses
                .map((address) => address.value)
                .filter((address) => address !== ""),
            index.toString(),
            new BigNumber(this.state.amount).multipliedBy(ether).toString(),
            this.addressesToRemove
        ).send({ from: accounts[0] });
        this.setState({ loading: false });
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
        return ReactDOM.createPortal(
            <div className="share-modal">
                <div className="share-modal__container">
                    <div className="share-modal__close-container" onClick={this.props.closeShareModal}>
                        <p>X</p>
                    </div>
                    <p>Share with:</p>
                    {this.state.loading && <Loader />}
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
                    <div className="amount-container">
                        <div className="amout__check-container">
                            <label className="container">Has amount
                                    <input type="checkbox" name="hasAmount" checked={this.state.hasAmount} onChange={this.handleCheck} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        {
                            this.state.hasAmount && <div className="amount-input-wrapper">
                                <input type="number" name="amount" className="amount-input" value={this.state.amount} onChange={this.handleAmountChange} />
                            </div>
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
    index: state.ui.shareIndex,
}), { showNotification, closeShareModal })(ShareModal);



