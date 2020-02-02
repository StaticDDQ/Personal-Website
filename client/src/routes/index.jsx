// JavaScript source code
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './styles/index.css';

import Transition from "./transition";
import Structure from "./structure";
import next from "./assets/next.png";
import prev from "./assets/prev.png";
import data from "./data/data";

const LinkLayout = styled.div`
    grid-area: txt;
    background-color: #394053;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
`

const UpdateLayout = styled.div`
    grid-area: update;
    background-color: #394053;
    box-shadow: 0 0 5px black;
    border-radius: 5px;
    text-align: center;
`

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectProject: data.info[0],
            selectInfo: data.info[0],
            nextTransition: true,
            nextProject: true,
            updates: [],
            projects: [],
            projIndex: 0,
            infoIndex: 0
        }

        fetch('/api/update/firstfive')
            .then(res => res.json())
            .then(res => {
                this.setState({ updates: res });
            });

        fetch('/api/project')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({ projects: res, projIndex: 0, selectProject: (res.length > 0) ? res[0] : null});
            });
    }

    SelectNewProject = (isNext) => {
        if (this.state.nextProject) {
            this.setState({ nextProject: false });
            let index = this.state.projIndex;

            setTimeout(() => {
                if (isNext) {
                    index += 1;
                    if (index === this.state.projects.length)
                        index = 0;
                } else if (!isNext) {
                    index -= 1;
                    if (index < 0)
                        index = this.state.projects.length - 1;
                }
                this.setState({ nextProject: true, projIndex: index, selectProject: this.state.projects[index] });
            }, 250);
        }
    }

    SelectNewInfo = (isNext) => {
        if (this.state.nextTransition) {
            this.setState({ nextTransition: false });

            setTimeout(() => {
                let index = this.state.infoIndex;

                if (isNext) {
                    index += 1;
                    if (index === data.info.length)
                        index = 0;
                } else if (!isNext) {
                    index -= 1;
                    if (index < 0)
                        index = data.info.length - 1;
                }
                this.setState({ nextTransition: true, infoIndex: index, selectInfo: data.info[index] });
            }, 250);
        }
    }

    render() {

        let ImageShowcase = styled.div`
            height: 100%;
            width: 100%;
            display: inline-block;
            background-size: cover;
            background-position: center;
            transition: all 0.5s ease;
            background-image: url(${this.state.selectProject != null ? process.env.PUBLIC_URL + '/img/' + this.state.selectProject.projlogo : "*"});

            &:hover {
                transform: scale(1.2);
            }
        `

        return (

            <Structure>
                <Transition />

                <div id="InfoLayout">

                    <input type="image" src={prev} alt="prevBtn" onClick={() => this.SelectNewInfo(false)} />

                    <div id="TextLayout" className={this.state.nextTransition ? 'fadeIn' : 'fadeOut'}>

                        <img src={this.state.selectInfo.img} alt="img" />
                        <h3>{this.state.selectInfo.title}</h3>
                        <p>
                            {this.state.selectInfo.text}
                        </p>
                    </div>

                    <input type="image" src={next} alt="nextBtn" onClick={() => this.SelectNewInfo(true)} />
                </div>

                <div className="ContentGrid">

                    <div id="ProjectShowcaseLayout">

                        <h1>Projects</h1>

                        <div className="projectImg">
                            <input type="image" src={prev} className="prevProj" alt="prevBtn" onClick={() => this.SelectNewProject(false)} />

                            <div className="projectDisplay">
                                <div className="imageShow">
                                    <Link to={(this.state.selectProject != null) ? "/project/" + this.state.selectProject.id : "*"} className={this.state.nextProject ? 'fadeIn' : 'fadeOut'}>
                                        <ImageShowcase>
                                        </ImageShowcase>
                                    </Link>
                                </div>

                                <div className="panelText">
                                    {(this.state.selectProject != null) ? this.state.selectProject.projtitle : "No Projects"}
                                </div>
                            </div>

                            <input type="image" src={next} className="nextProj" alt="nextBtn" onClick={() => this.SelectNewProject(true)} />
                        </div>

                        <div className="endTrail" />
                    </div>

                    <LinkLayout>
                        <h3 style={{ paddingLeft: "40px" }}>Just a short list of links about myself if you wanna check,</h3>

                        <ul className="linkFeed">
                            {data.links.map((e, index) => (
                                <li key={index}>
                                    {e.name}: <a href={e.link}>{e.text}</a>
                                    <br />
                                </li>
                            ))}
                            <li key="-1">
                                Business Email: <a href="mailto: nicolahalim0@gmail.com?subject=Hello!">nicolahalim0@gmail.com</a>
                            </li>
                        </ul>
                    </LinkLayout>

                    <UpdateLayout>
                        <h3>Recent Updates</h3>
                        <ul className="updateFeed">
                            {this.state.updates.map((e, index) => (
                                <Link to={"/update/?=" + e.id} style={{ textDecoration: 'none', color: '#f8f7e6', textAlign: "left" }}>
                                    <li key={index} style={{ paddingLeft: "10px" }}>
                                        {e.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </UpdateLayout>
                </div>
            </Structure>
        )
    }
};

export default MainPage;