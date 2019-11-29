import React from 'react';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import { Context } from '../../utils/context';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            newFile: false,
            indexes: [],
        }
    }

    async componentDidMount() {
        const { ipfs, accounts, contract } = this.context;

        const indexes = await contract.methods.getIndexes().call({ from: accounts[0] });
        this.setState({ indexes })
    }

    render() {
        const { newFile, indexes } = this.state;
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

Home.contextType = Context;

export default Home;