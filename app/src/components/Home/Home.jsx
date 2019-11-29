import React from 'react';
import ListItem from '../ListItem/ListItem';
import { setIndexes } from "../../actions/contract";
import { connect } from "react-redux";
import './Home.css';

class Home extends React.Component {
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
            <div className="home__item-view">
                <h3>My Documents</h3>
                <div className="home__items-container">
                    {
                        indexes.map((index) => {
                            return (
                                <div className="home__item">
                                    <ListItem key={index} />
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
}), { setIndexes })(Home);