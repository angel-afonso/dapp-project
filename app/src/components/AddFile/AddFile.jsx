import React from 'react';
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
import { updateIndexes } from "../../actions/contract";
import { showNotification } from "../../actions/ui";
import "./AddFile.css";

class AddFile extends React.Component {
    constructor() {
        super();
        this.state = {
            file: "",
            name: "",
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.uploadDocument = this.uploadDocument.bind(this);
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

    uploadDocument() {
        if (!this.state.file) return;
        const { ipfs, accounts, storage, updateIndexes, showNotification } = this.props;

        let fileReader = new FileReader();
        this.setState({ loading: true });
        fileReader.onload = async () => {
            ipfs.add(Buffer.from(fileReader.result)).then(async (result) => {
                await storage.methods
                    .add(result[0].path,
                        0,
                        this.state.name)
                    .send({ from: accounts[0] });

                updateIndexes(storage, accounts[0]);
                this.setState({
                    file: "",
                    name: "",
                    hasAmount: "",
                    loading: false
                });

                showNotification("File uploaded successfully");
            });
        };

        fileReader.readAsArrayBuffer(this.state.file);
    }

    render() {
        return ReactDOM.createPortal(
            <div className="upload-modal">
                <div className="upload-modal__container">
                    <div className="close-container" onClick={this.props.closeModal}>
                        <p>X</p>
                    </div>
                    {this.state.loading && <Loader />}
                    <input type="file" id="file" onChange={this.handleChangeFile()} />
                    <label htmlFor="file" className="upload-input" >Select File</label>
                    <input type="text" name="name" value={this.state.name} className="name-input upload-input" disabled />
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
}), { updateIndexes, showNotification })(AddFile);