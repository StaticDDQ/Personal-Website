// JavaScript source code
import React from 'react';
import Structure from "./structure";
import { Link } from 'react-router-dom';
import "./styles/progressPage.css";
import s0 from "./assets/sample.png";
import Transition from "./transition";

class Progress extends React.Component {

    state = {
        updates: []
    }

    componentDidMount() {
        fetch('/api/update')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ updates: res });
            });
    }

    render() {
        return (
            <Structure>
                <Transition />
                <ul className="updates">
                    {this.state.updates.map((e, index) => (
                        <Link to={"/update/?=" + e.id}>
                            <li key={index}>
                                <div>
                                    <img src={s0} alt="img" />

                                    <h3>{e.title}</h3>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </Structure>
        )
    }
};

export default Progress;