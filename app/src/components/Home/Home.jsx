import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Link to="/save" >save</Link>
            <br />
            <Link to="/list" >list</Link>
        </div >
    )
}