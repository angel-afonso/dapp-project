import React from 'react';
import ReactDOM from "react-dom";
import PopUp from "../PopUp/PopUp"
import "./AddFile.css";
import { Context } from '../../utils/context'

class AddFile extends React.Component {
    constructor() {
        super();
        this.state = {
            file: "",
            name: "",
            hasAmount: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.uploadDocument = this.uploadDocument.bind(this);
    }

    handleChangeFile() {
        return ({ target }) => {
            this.setState({ file: target.files[0], name: target.files[0].name });
        }
    }

    handleChange() {
        return ({ target }) => {
            this.setState({
                [target.name]: target.value,
            });
        }
    }

    handleCheck() {
        return ({ target }) => {
            this.setState({
                [target.name]: target.checked,
            });
        }
    }

    uploadDocument() {
        if (!this.input) return;
        const { ipfs, accounts, contract } = this.context;

        let fileReader = new FileReader();
        fileReader.onload = async function () {
            ipfs.add(Buffer.from(fileReader.result)).then(async (result) => {
                console.log(result);
                const tx = await contract.methods.add(result[0].path, 0, 'test file', []).send({ from: accounts[0] });
                console.log(tx);
            });
        };

        fileReader.readAsArrayBuffer(this.input[0]);
    }

    render() {
        return ReactDOM.createPortal(
            <div className="upload-modal">
                <div className="upload-modal__container">
                    <div className="close-container">
                        <p>X</p>
                    </div>
                    <input type="file" id="file" onChange={this.handleChangeFile()} />
                    <label htmlFor="file" className="upload-input" >Select File</label>
                    <input type="text" name="name" placeholder="Asing name" value={this.state.name} className="name-input upload-input" onChange={this.handleChange()} />
                    <div className="upload-input input-check" >
                        <label htmlFor="hasAmount" className="input-wrapper--btn">Asing payment</label>
                        <input type="checkbox" name="hasAmount" checked={this.state.hashAmount} onChange={this.handleCheck()} />
                    </div>
                    <div className="upload-input">
                        <button onClick={this.uploadDocument} className="upload-modal__accept-btn">accept</button>
                    </div>
                </div>
            </div >
            , document.body);

    }
}

AddFile.contextType = Context;
export default AddFile;