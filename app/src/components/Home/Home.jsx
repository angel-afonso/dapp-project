import React from 'react';
import ListItem from '../ListItem/ListItem';
import './Home.css';
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { Link } from 'react-router-dom';
import AddFile from "../AddFile/AddFile";
import { Context } from '../../utils/context';

class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <AddFile />
                <div className="home__sidebar">
                    <div className="home__logo">
                        <Logo />
                    </div>
                    <div className="home__options">
                        <button className="options__item--new">New</button>
                        <button className="options__item">Shared</button>
                        <button className="options__item">upload</button>
                    </div>
                </div>
                <div className="home__item-view">
                    <h3>My Documents</h3>
                    <div className="home__items-container">
                        {
                            [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((index) => {
                                return (
                                    <div className="home__item">
                                        <ListItem key={index} />
                                    </div>)
                            })
                        }
                    </div>
                </div>
            </div >
        )
    }
}

Home.contextType = Context;
export default Home;