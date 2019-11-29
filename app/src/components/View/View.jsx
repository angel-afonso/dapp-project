import React from 'react';

class View extends React.Component {
    constructor() {
        super();
        this.state = {
            file: "",
        }
    }

    async componentDidMount() {
        const { contract, accounts } = this.context;
        const { match: { params: { index } } } = this.props;
        let tx = await contract.methods.getFile(index).call({ from: accounts[0] });
        this.setState({
            file: tx[0],
        });
    }

    render() {
        return (
            <div>
                {this.state.file && <img src={`https://ipfs.io/ipfs/${this.state.file}`} />}
            </div>
        )
    }
}

View.contextType = Context;
export default View;