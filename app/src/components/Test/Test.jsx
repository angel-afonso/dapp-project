import React from 'react';
import { Context } from '../../utils/context';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            result: {},
            loading: false,
            data: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.input = value;
    }

    async save() {
        const { ipfs } = this.context;
        this.setState({ loading: true });
        let result = await ipfs.add(Buffer.from(this.input));
        console.log(result)
        this.setState({ loading: false, result: result[0] });
    }

    get(hash) {
        const { ipfs } = this.context;
        return async () => {
            const files = await ipfs.get(hash)
            files.forEach((file) => {
                this.setState({ data: file.content.toString('utf8') })
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    insert text
                <input type="text" onChange={this.handleChange} />
                    <button onClick={this.save}>save</button>
                    <p>hash: {this.state.result.hash}</p>
                    <button onClick={this.get(this.state.result.path)}>retrieve</button>
                    <p>{this.state.data}</p>
                </div>
            </div>
        );
    }
}

Test.contextType = Context;

export default Test;