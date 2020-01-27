// JavaScript source code
import React from 'react';
import Structure from "./structure";
import "./styles/update.css";

class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            info: '',
            date: ''
        }
    }

    componentDidMount() {
        var path = this.props.location.search;
        var id = path.slice(path.indexOf('=') + 1, path.length);

        fetch('/api/update/' + id)
            .then(res => res.json())
            .then(res => {
                this.setState({ title: res[0].title, info: res[0].info, date: res[0].date });

            });
    }

    render() {
        
        return (
            <Structure>
                <div className="updateField">
                    <h1 className="updateTitle"> {this.state.title}, {this.state.date} </h1>

                    <p className="updateText">
                        {this.state.info}
                    </p>
                </div>
            </Structure>
        )
    }
};

export default Update;