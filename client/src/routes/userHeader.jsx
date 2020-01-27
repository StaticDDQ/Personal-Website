// JavaScript source code
import React from 'react';
import './styles/userHeader.css';
import { Link } from 'react-router-dom';

class UserHeader extends React.Component {

    render() {

        return (
            <div id="UserHeaderLayout">
                <div id="Logo">
                    <Link to="/" className="url">
                        <b>DDQ</b>
                    </Link>
                </div>

                <div className="buttonControls">
                    <Link to="/progress" className="url">Progression</Link>
                    <Link to="/createupdate" className="url">Update</Link>
                    <Link to="/createproject" className="url">Project</Link>
                    
                </div>
            </div>
        );
    }
}

export default UserHeader;