import React from 'react';
import ListItem from '../ListItem/ListItem';
import { setIndexes, updateIndexes } from "../../actions/contract";
import { connect } from "react-redux";
import './Home.css';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            indexes: [],
            test: "",
        }
    }

    async componentDidMount() {
        const { accounts, storage, setIndexes } = this.props;
        try {
            const indexes = await storage.methods.getIndexes().call({ from: accounts[0] });
            setIndexes(indexes);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.accounts[0] !== this.props.accounts[0]) {
            const { accounts, storage, updateIndexes } = this.props;
            updateIndexes(storage, accounts[0]);
        }
    }

    render() {
        const { indexes } = this.props;
        return (
            <div className="home__item-view">
                <h3 className="title">My Files</h3>
                <div className="home__items-container">
                    {
                        indexes.map((index) => {
                            return (
                                <div key={index} className="home__item">
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
    storage: state.contract.storage,
    accounts: state.contract.accounts,
    indexes: state.contract.indexes,
}), { setIndexes, updateIndexes })(Home);