import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            indexes: [],
        };
    }

    async componentDidMount() {
        const { contract, accounts } = this.context;
        let tx = await contract.methods.getIndexes().call({ from: accounts[0] });
        console.log(tx);
        this.setState({
            indexes: tx,
        })
    }

    render() {
        return (
            <div>
                {this.state.indexes.map((index) => {
                    return (<Link to={`/view/${index}`}>{index}</Link>)
                })}
            </div>
        );
    }
}

List.contextType = Context;
export default List;    