import React from 'react';
import ReactDOM from "react-dom";
import './Loader.css';

function FullscreenWrapper({ children }) {
    return (
        <div className="loader-wrapper">
            {children}
        </div>
    )
}

function Circle() {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default function Loader({ onlyCircle = false }) {
    return onlyCircle ? (
        <Circle />
    ) : ReactDOM.createPortal(
        <FullscreenWrapper>
            <Circle />
        </FullscreenWrapper>
        , document.body)
}