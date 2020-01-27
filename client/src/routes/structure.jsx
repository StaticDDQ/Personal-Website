// JavaScript source code
import React from 'react';
import Header from './header';
import UserHeader from './userHeader';
import './styles/structure.css';
import { connect } from 'react-redux';

const Structure = (props) => {
    return (
        <div id="Background">
            <div id="ContentLayout">
                {!props.isLogged ? <Header /> : <UserHeader />}
                {props.children}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps)(Structure);