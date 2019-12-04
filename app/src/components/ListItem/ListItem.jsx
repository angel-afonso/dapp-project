import React from 'react';
import "./ListItem.css";
import { connect } from "react-redux";
import { ReactComponent as Dots } from "../../assets/img/three-dots.svg";
// import { ReactComponent as Image } from "../../assets/img/image.svg";
// import { ReactComponent as Pdf } from "../../assets/img/PDF.svg";
// import { ReactComponent as PowerPoint } from "../../assets/img/POWER POINT.svg";
// import { ReactComponent as Word } from "../../assets/img/WORD.svg";
import Options from "./Options";
import { showShareModal, showDeleteModal } from "../../actions/ui";
import { BigNumber } from "bignumber.js";
import Loader from '../Loader/Loader';

const ether = new BigNumber(10 ** 18)
class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            loading: true,
            showOptions: false,
            amount: 0,
        }
        this.optionsRef = React.createRef();
        this.closeOptions = this.closeOptions.bind(this);
        this.showOptions = this.showOptions.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }

    showOptions() {
        this.setState({ showOptions: true });
        document.addEventListener("click", this.closeOptions)
    }

    closeOptions(e) {
        if (e.target !== this.optionsRef) {
            document.removeEventListener("click", this.closeOptions);
            this.setState({ showOptions: false });
        }
    }

    async selectOption(value) {
        const { storage, accounts, index, ipfs, shared } = this.props;
        try {
            if (value === "download") {
                let hash;
                if (shared) {
                    await storage.methods.viewFile(index).send({ from: accounts[0], value: this.state.amount });
                    const data = await storage.methods.viewFile(index).call({ from: accounts[0], value: this.state.amount });
                    hash = data[0];
                } else {
                    const data = await storage.methods.getFile(index).call({ from: accounts[0] });
                    hash = data[0];
                }
                ipfs.get(hash).then((files) => {
                    const file = new Blob([files[0].content], { type: 'application/octet-binary' })
                    const url = URL.createObjectURL(file);
                    const link = document.createElement('a');
                    link.href = url
                    link.download = this.state.name;
                    document.body.append(link);
                    link.click();
                    link.remove();
                }).catch(console.log)
                return;

            }
            this.props[value](this.props.index);
        } catch (error) { console.log(error) }
    }

    async componentDidMount() {
        const { storage, accounts, index, shared } = this.props;
        try {
            if (shared) {
                const data = await storage.methods.filePreview(index).call({ from: accounts[0] });
                this.setState({ name: data[0], loading: false, amount: data[1] });
                return;
            }
            const data = await storage.methods.getFile(index).call({ from: accounts[0] });
            this.setState({ name: data[1], loading: false });
        } catch (error) {
            console.log(error);
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className="item-card">
                <div className="item-card__container" title={this.state.name}>
                    <div className="item-card__image-container" >
                        {this.state.loading ? <Loader onlyCircle /> : null}
                    </div>
                    <div className="item-card__info">
                        <p className="item-name">{this.state.name}</p>
                        <div className="item-dots">
                            {this.props.shared && <p>{new BigNumber(this.state.amount).dividedBy(ether).toString()} eth</p>}
                            <div className="dots-container" onClick={this.showOptions}>
                                <Dots />
                            </div>
                        </div>
                        {this.state.showOptions && <Options shared={this.props.shared} onSelect={this.selectOption} divRef={this.optionsRef} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    storage: state.contract.storage,
    ipfs: state.contract.ipfs,
    accounts: state.contract.accounts,
}), { share: showShareModal, delete: showDeleteModal })(ListItem);