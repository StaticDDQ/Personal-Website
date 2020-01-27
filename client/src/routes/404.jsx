// JavaScript source code
import React from 'react';
import Structure from "./structure";
import './styles/404.css';

export default class NotFound extends React.Component {
    render() {
        return (
            <Structure>
                <div className="notFoundPage">
                    404 Not Found
                </div>
            </Structure>
        )
    }
};