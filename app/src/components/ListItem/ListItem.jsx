import React from 'react';
import "./ListItem.css";
import { connect } from "react-redux";
import { ReactComponent as Dots } from "../../assets/img/three-dots.svg"
import Options from "./Options";

class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            loading: true,
            showOptions: false
        }
        this.optionsRef = React.createRef();
        this.closeOptions = this.closeOptions.bind(this);
        this.showOptions = this.showOptions.bind(this);
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

    selectOption(e) {

    }

    async componentDidMount() {
        const { storage, accounts, index } = this.props;
        const data = await storage.methods.getFile(index).call({ from: accounts[0] });
        this.setState({ name: data[1], loading: false });
    }

    render() {
        return (
            <div className="item-card">
                <div className="item-card__container">
                    <div className="item-card__image-container" />
                    <div className="item-card__info">
                        <p>{this.state.name}</p>
                        <div className="dots-container" onClick={this.showOptions}>
                            <Dots />
                        </div>
                        {this.state.showOptions && <Options onSelect={this.selectOption} divRef={this.optionsRef} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    storage: state.contract.storage,
    accounts: state.contract.accounts,
}), null)(ListItem);