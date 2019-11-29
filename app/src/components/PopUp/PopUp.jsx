import React from "react";
import ReactDOM from "react-dom";
import "./PopUp.css";

class PopUp extends React.Component {
    constructor() {
        super();
        this.state = {
            close: false
        }
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        if (this.timeout) window.clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
            console.log("here");
            this.setState({ close: true });
            this.close();
        }, 5 * 1000);
    }

    close() {
        const { hide } = this.props;
        if (this.closeTimeout) window.clearTimeout(this.closeTimeout);
        this.closeTimeout = window.setTimeout(() => {
            hide();
        }, 1 * 1000);
    }

    render() {
        const { message } = this.props;
        return ReactDOM.createPortal(
            <div className={`popup-container popup-container${this.state.close ? "--close" : "--open"}`}>
                <div className="popup-content">
                    {message}
                </div>
            </div>
            , document.body);
    }
}
PopUp.defaultProps = {
    hide: () => { }
}

export default PopUp;