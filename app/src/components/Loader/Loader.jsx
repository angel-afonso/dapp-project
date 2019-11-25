import React from 'react';
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
    ) : (
            <FullscreenWrapper>
                <Circle />
            </FullscreenWrapper>
        )
}