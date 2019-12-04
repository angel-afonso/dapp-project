import React from 'react';
import ListItem from '../ListItem/ListItem';
import { setIndexes, updateSharedIndexes } from "../../actions/contract";
import { connect } from "react-redux";
import './SharedFiles.css';

class SharedFiles extends React.Component {
    async componentDidMount() {
        const { accounts, storage, updateSharedIndexes } = this.props;
        updateSharedIndexes(storage, accounts[0]);
    }

    async componentDidUpdate(prevProps) {
        const { accounts, storage, updateIndexes } = this.props;
        if (prevProps.accounts !== this.props.accounts) {
            const { accounts, storage, updateSharedIndexes } = this.props;
            updateSharedIndexes(storage, accounts[0]);
        }
    }

    render() {
        const { indexes } = this.props;
        return (
            <div className="sharedfiles__item-view">
                <h3>Shared with me:</h3>
                <div className="sharedfiles__items-container">
                    {
                        indexes.map((index) => {
                            return (
                                <div key={index} className="sharedfiles__item">
                                    <ListItem shared index={index} />
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
    indexes: state.contract.sharedIndexes,
}), { setIndexes, updateSharedIndexes })(SharedFiles);