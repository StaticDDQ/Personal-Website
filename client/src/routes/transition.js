import React from 'react';
import './styles/transition.css';
import SlideShow from "./slideshow";
import slide1 from "./assets/slide1.jpg";
import slide2 from "./assets/slide2.png";
import slide3 from "./assets/slide3.jpg";

const style = {
    container: "screenW screenH dGray col",
    main: "flex8",
    footer: "flex1 fCenter"
};

const slides = [slide1, slide2, slide3];

export default class Transition extends React.Component {

    render() {
        return (
            <div>
                <div className={style.container}>
                    <div className={style.main}>
                        <SlideShow slides={slides} />
                    </div>
                    <div className={style.footer}/>
                </div>
            </div>
        );
    }
}