// JavaScript source code
import React from 'react';
import Structure from "./structure";
import "./styles/projectCreate.css";
import UploadImg from "./uploadImg";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'react-addons-update'; 

const MAXUPLOAD = 5;

class ProjectCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            desc: "",
            selectedFile: null,
            displayLogo: null,
            imgCounter: 0,
            selectedFiles: new Array(MAXUPLOAD),
            redirect: false
        }
    }

    updateTitle = (event) => {
        this.setState({ title: event.target.value });
    }

    updateDesc = (event) => {
        this.setState({ desc: event.target.value });
    }

    SubmitUpdate = (event) => {
        event.preventDefault();

        let data = {
            projTitle: this.state.title,
            projDesc: this.state.desc,
            projLogo: this.state.selectedFile,
            projImgs: this.state.selectedFiles
        }

        fetch('/api/project', {
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

    handleChange = (event) => {
        var file = event.target.files[0];
        this.setState({
            selectedFile: file.name,
            displayLogo: URL.createObjectURL(file)
        })
    }

    handleUpload(event, id) {

        var file = event.target.files[0].name;
        this.setState({
            selectedFiles: update(this.state.selectedFiles, { [id]: { $set: file } })
        });
    }

    addImg = () => {
        if (this.state.imgCounter < MAXUPLOAD) {
            this.setState({
                imgCounter: this.state.imgCounter + 1
            })
        }
    }

    removeImg = () => {
        if (this.state.imgCounter > 0) {
            this.setState({
                imgCounter: this.state.imgCounter - 1
            })
        }
    }

    render() {
        if (!this.props.isLogged) {
            return <Redirect to="/404" />
        }

        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
            <Structure>
                <div className="createProject">
                    <form onSubmit={this.SubmitUpdate} >
                        <div className="createProjectForm">
                            <input type="text" className="createProjectTitle" placeholder="Enter title.." onChange={this.updateTitle} />
                            <img id="projectLogoDisplay" src={this.state.displayLogo} alt="" />

                            <input type="file" id="selectedFile" onChange={this.handleChange} accept="image/*" style={{ display: 'none'  }} />
                            <input type="button" value="Browse..." className="uploadLogo" onClick={() => document.getElementById('selectedFile').click()} />

                            <textarea className="createProjectDesc" placeholder="Enter description.." onChange={this.updateDesc} />

                            <button type="button" onClick={this.addImg} className="add"> + </button>
                            <button type="button" onClick={this.removeImg} className="remove"> - </button>
                            <ul className="uploadImgs">
                                {Array.from(Array(this.state.imgCounter), (i, index) => {
                                    return <li key={index}><UploadImg id={index} handleUpload={this.handleUpload.bind(this)} /></li>
                                })}
                            </ul>

                            <input type="submit" value="Submit" className="submitProject" />
                        </div>
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

export default connect(mapStateToProps)(ProjectCreate);