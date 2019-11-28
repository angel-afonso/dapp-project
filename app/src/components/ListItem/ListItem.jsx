import React from 'react';
import "./ListItem.css";
import { ReactComponent as Dots } from "../../assets/img/three-dots.svg"
class ListItem extends React.Component {
    render() {
        return (
            <div className="item-card">
                <div className="item-card__container">
                    <div className="item-card__image-container" />
                    <div className="item-card__info">
                        <p>asd</p>
                        <Dots />
                    </div>
                </div>
            </div>
        )
    }
}

export default ListItem;