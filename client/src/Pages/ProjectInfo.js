import React from 'react';
import './ProjectInfo.css';
import mainLogo from '../Files/bruinsource_logo.png'
import history from '../history.js'
class ProjectInfo extends React.Component {
    render() {
        return (
            <div className="ProjectInfo">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h1>Project Name</h1>
                <p>Lorem ipsum dolor amet</p>
                    <div className="Buttons">
                        <button type="button" className="BackToProjects" onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
                        <button type="button" className="RequestAccess">Request Access</button>
                    </div>
            </div>
        );
    }
}

export default ProjectInfo;