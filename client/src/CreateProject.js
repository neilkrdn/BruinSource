import React from 'react';
import './CreateProject.css';
import mainLogo from './bruinsource_logo.png'

class CreateProject extends React.Component {
    render() {
        return (
            <div className="CreateProject">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <form className="Inputs">
                    <div className="Project Name">
                        <input 
                        type="text" 
                        placeholder="Project Name..."
                        required
                        />
                    </div>
                    <div className="Project Description">
                        <input
                        type="text"
                        placeholder="Project Description..."
                        required
                        />
                    </div>
                    <div className="Project Tags">
                        <input
                        type="text"
                        placeholder="Project Tags (comma-separated)..."
                        required
                        />
                    </div>
                    <div className="Project GitHub">
                        <input
                        type="text"
                        placeholder="http://github.com/..."
                        />
                    </div>
                <button type="button" className="BackToDash">Back to Projects</button>
                <button type="button" className="CreateNewProject">Create New Project</button>
                </form>
            </div>
        );
    }
}

export default CreateProject;