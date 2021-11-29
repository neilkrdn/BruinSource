import React from 'react';
import './CreateProject.css';
import mainLogo from './bruinsource_logo.png'
import history from './history';

class CreateProject extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = 
        {
            name: null,
            description: null,
            tags: null,
            github: null,
        }
    }

    onCreateProject = () => 
    {
        //axios.post('/api/createproject', {name: this.state.name, description: this.state.description, tags: this.state.tags, github: this.state.github})
        /*
                    setAlert('Project created successfully! Redirecting...')
                    setTimeout(() => {
                        history.push('/dashboard')
                    }, 5000);
        */
    }

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
                        <button type="button" className="BackToProjects" onClick={() => history.push('/dashboard')}>Back to Projects</button>
                        <button type="button" className="CreateNewProject" /* onClick={this.onCreateProject} */>Create New Project</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;