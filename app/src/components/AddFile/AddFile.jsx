import React from 'react';
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { updateIndexes } from "../../actions/contract";
import PopUp from "../PopUp/PopUp";
import { BigNumber } from "bignumber.js";
import "./AddFile.css";

const currency = {
    wei: new BigNumber(10 ** 18),
    finney: new BigNumber(10 ** 15),
    ether: new BigNumber(1),
};

class AddFile extends React.Component {
    constructor() {
        super();
        this.state = {
            file: "",
            name: "",
            amount: 0,
            hasAmount: true,
            showNotification: false,
            notificationMessage: "",
            currency: "wei"
        };
        this.hideNotification = this.hideNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.uploadDocument = this.uploadDocument.bind(this);
        this.close = this.close.bind(this);
    }

    handleChangeFile() {
        return ({ target }) => {
            this.setState({ file: target.files[0], name: target.files[0].name });
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    handleCheck({ target }) {
        this.setState({
            [target.name]: target.checked,
        });
    }

    hideNotification() {
        this.setState({ showNotification: false });
    }

    uploadDocument() {
        if (!this.state.file) return;
        const { ipfs, accounts, storage, updateIndexes } = this.props;
        console.log(this.state.amount * currency[this.state.currency])
        let fileReader = new FileReader();
        fileReader.onload = async () => {
            ipfs.add(Buffer.from(fileReader.result)).then(async (result) => {
                await storage.methods
                    .add(result[0].path,
                        currency[this.state.currency].multipliedBy(this.state.amount).toString(),
                        this.state.name, [])
                    .send({ from: accounts[0] });

                updateIndexes(storage, accounts[0]);

                this.setState({
                    showNotification: true,
                    notificationMessage: "File saved successfully",
                    file: "",
                    name: "",
                    hasAmount: ""
                })
            });
        };

        fileReader.readAsArrayBuffer(this.state.file);
    }

    close() {
        const { closeModal } = this.props;
        closeModal();
    }

    render() {
        const { showNotification, notificationMessage, hasAmount, amount } = this.state;
        return ReactDOM.createPortal(
            <div className="upload-modal">
                {showNotification && <PopUp message={notificationMessage} hide={this.hideNotification} />}
                <div className="upload-modal__container">
                    <div className="close-container" onClick={this.close}>
                        <p>X</p>
                    </div>
                    <input type="file" id="file" onChange={this.handleChangeFile()} />
                    <label htmlFor="file" className="upload-input" >Select File</label>
                    <input type="text" name="name" value={this.state.name} className="name-input upload-input" disabled />
                    <div className="upload-input input-check" >
                        <label htmlFor="hasAmount" className="input-wrapper--btn">Asing payment</label>
                        <input type="checkbox" name="hasAmount" checked={this.state.hashAmount} onChange={this.handleCheck} />
                    </div>
                    {
                        hasAmount &&
                        <div className="amount-container">
                            <input name="amount" placeholder="Set amount" className="amount-input" value={amount} onChange={this.handleChange} />
                            <select value={this.state.currency} name="currency" onChange={this.handleChange} defaultValue="wei">
                                <option value="wei">Wei</option>
                                <option value="finney">Finney</option>
                                <option value="ether">Ether</option>
                            </select>
                        </div>
                    }
                    <div className="upload-input">
                        <button onClick={this.uploadDocument} className="upload-modal__accept-btn">accept</button>
                    </div>
                </div>
            </div >
            , document.body);

    }
}

AddFile.defaultProps = {
    closeModal: () => { },
};

export default connect((state) => ({
    ipfs: state.contract.ipfs,
    storage: state.contract.storage,
    accounts: state.contract.accounts,
}), { updateIndexes })(AddFile);