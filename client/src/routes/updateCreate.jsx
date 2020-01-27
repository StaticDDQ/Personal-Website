// JavaScript source code
import React from 'react';
import Structure from "./structure";
import "./styles/updateCreate.css";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class UpdateCreate extends React.Component {

    state = {
        title: "",
        info: "",
        redirect: false
    }

    updateTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    updateInfo = (event) => {
        this.setState({ info: event.target.value });
    }

    SubmitUpdate = (event) => {
        event.preventDefault();

        var currentDate = new Date().toLocaleDateString();

        let data = {
            title: this.state.title,
            info: this.state.info,
            date: currentDate
        }

        fetch('/api/update', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ redirect: true });
            });
    }

    render() {
        if (!this.props.isLogged) {
            return <Redirect to="/404"/>
        }
        if (this.state.redirect) {
            return <Redirect to="/"/>
        }

        return (
            <Structure>
                <div className="createUpdate">
                    <form onSubmit={this.SubmitUpdate} >
                        <input type="text" className="createUpdateTitle" placeholder="Enter title.." onChange={this.updateTitle} />
                        <textarea className="createUpdateDesc" placeholder="Enter description.." onChange={this.updateInfo} />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </Structure>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps)(UpdateCreate);