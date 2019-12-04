import React from "react";
import ReactDOM from "react-dom";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { updateIndexes } from "../../actions/contract"
import { showNotification, closeDeleteModal } from "../../actions/ui";
import "./DeleteModal.css";

class DeleteModal extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        }
        this.deleteFile = this.deleteFile.bind(this);
    }

    async deleteFile() {
        const { storage, accounts, index, closeDeleteModal, updateIndexes, showNotification } = this.props;
        this.setState({ loading: true });
        storage.methods.deleteFile(index.toString()).send({ from: accounts[0] }).once("transactionHash", () => {
            showNotification("Wait until the transaction get mined");
            closeDeleteModal();
            this.setState({ loading: false });
        }).once("error", () => {
            this.setState({ loading: false });
            showNotification("Transaction error");
        }).then(() => {
            updateIndexes(storage, accounts[0])
            showNotification("File deleted successfully");
        });
    }

    render() {
        return ReactDOM.createPortal(
            <div className="delete-modal">
                <div className="delete-modal__container">
                    <div className="delete-modal__close-container" onClick={this.props.closeDeleteModal}>
                        <p>X</p>
                    </div>
                    {this.state.loading && <Loader />}
                    <p>Delete file? </p>
                    <div className="delete-modal__buttons">
                        <div className="delete__buttons">
                            <button className="delete-modal__accept-btn" onClick={this.props.closeDeleteModal}>
                                Cancel
                            </button>
                            <button className="delete-modal__accept-btn" onClick={this.deleteFile}>
                                Accept
                            </button>
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
    index: state.ui.deleteIndex
}), { showNotification, closeDeleteModal, updateIndexes })(DeleteModal);



