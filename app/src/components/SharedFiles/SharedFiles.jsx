import React from 'react';
import ListItem from '../ListItem/ListItem';
import { setIndexes } from "../../actions/contract";
import { connect } from "react-redux";
import './SharedFiles.css';

class SharedFiles extends React.Component {
    constructor() {
        super();
        this.state = {
            indexes: [],
        }
    }

    async componentDidMount() {
        const { accounts, storage, setIndexes } = this.props;
        const indexes = await storage.methods.getIndexes().call({ from: accounts[0] });
        setIndexes(indexes);
    }

    render() {
        const { indexes } = this.props;
        return (
            <div className="sharedfiles__item-view">
                <h3>My Documents</h3>
                <div className="sharedfiles__items-container">
                    {
                        indexes.map((index) => {
                            return (
                                <div key={index} className="sharedfiles__item">
                                    <ListItem index={index} />
                                </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    ipfs: state.contract.ipfs,
    storage: state.contract.storage,
    accounts: state.contract.accounts,
    indexes: state.contract.indexes,
}), { setIndexes })(SharedFiles);