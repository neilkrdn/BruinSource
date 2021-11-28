import React from 'react';
import './CreateProject.css';
import mainLogo from './bruinsource_logo.png'

class CreateProject extends React.Component {
    render() {
        return (
            <div className="CreateProject">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h2> Create A New Project </h2>
                <form className="Inputs">
                    <div className="ProjectName">
                        <input 
                        type="text" 
                        placeholder="Project Name..."
                        required
                        />
                    </div>
                    <div className="ProjectDescription">
                        <textarea
                        type="text"
                        placeholder="Project Description..."
                        required
                        />
                    </div>
                    <div className="ProjectTags">
                        <input
                        type="text"
                        placeholder="Project Tags (comma-separated)..."
                        required
                        />
                    </div>
                    <div className="ProjectGitHub">
                        <input
                        type="text"
                        placeholder="http://github.com/..."
                        />
                    </div>
                    <div className="Buttons">
                        <button type="button" className="BackToProjects">Back to Projects</button>
                        <button type="button" className="CreateNewProject">Create New Project</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;