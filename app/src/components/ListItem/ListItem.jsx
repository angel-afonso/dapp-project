import React from 'react';
import "./ListItem.css";
import { connect } from "react-redux";
import { ReactComponent as Dots } from "../../assets/img/three-dots.svg"
class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            loading: true,
        }
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
                        <Dots />
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