// JavaScript source code
import React from 'react';
import Structure from "./structure";
import "./styles/project.css";
import styled from 'styled-components';

const PeakLayout = styled.div`
    grid-area: peak;
    display: grid;
    grid-template-rows: 75% auto;
    background-color: #4e4a59;
    box-shadow: 0 0 20px black;
`

const InfoLayout = styled.div`
    grid-area: desc;
    display: grid;
    grid-template-rows: 3em 30% auto;
    box-shadow: 0 0 20px black;
`

class Project extends React.Component {

    state = {
        selectedImg: null,
        title: "",
        desc: "",
        logo: "",
        imgs: []
    }

    componentDidMount() {
        var path = window.location.pathname;
        var id = path.slice(path.indexOf('t') +2, path.length);
        fetch('/api/project/' + id)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    title: res[0].projtitle, desc: res[0].projdesc,
                    logo: res[0].projlogo,
                    imgs: res[0].projimgs, selectedImg: res[0].projimgs[0]
                });
            });
    }

    SelectImage(img) {
        this.setState({
            selectedImg: img
        });
    }

    render() {

        return (
            <Structure>
                <div id="ProjectLayout">
                    <InfoLayout>
                        <h1 className="projectTitle"> {this.state.title} </h1>

                        <img src={process.env.PUBLIC_URL + '/img/' + this.state.logo} className="logo" alt="Title" />

                        <p className="infoText">
                            {this.state.desc}
                        </p>
                    </InfoLayout>

                    <PeakLayout>
                        <img src={process.env.PUBLIC_URL + '/img/' + this.state.selectedImg} alt="prt" id="showPic" />
                        <div className="peak">
                            {this.state.imgs.map((element) => (
                                <img src={process.env.PUBLIC_URL + '/img/' + element} alt={element} onClick={() => this.SelectImage(process.env.PUBLIC_URL + '/img/' + element)} />
                            ))}
                        </div>
                    </PeakLayout>
                </div>
            </Structure>
        )
    }
};

export default Project;