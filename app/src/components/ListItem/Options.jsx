import React from "react";
import "./Options.css";

export default class Options extends React.Component {
    constructor() {
        super();
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        const { onSelect } = this.props;
        onSelect(e.target.innerText.toLowerCase());
    }

    render() {
        return (
            <div ref={this.props.divRef} className="item-options">
                <p onClick={this.onSelect}>Share</p>
                <p onClick={this.onSelect}>Delete</p>
            </div>
        )
    }
}