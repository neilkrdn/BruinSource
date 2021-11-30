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
                        onChange={(input) => this.setState({ name: input.target.value })}
                        />
                    </div>
                    <div className="ProjectDescription">
                        <textarea
                        type="text"
                        placeholder="Project Description..."
                        required
                        onChange={(input) => this.setState({ description: input.target.value })}
                        />
                    </div>
                    <div className="ProjectTags">
                        <input
                        type="text"
                        placeholder="Project Tags (comma-separated)..."
                        required
                        onChange={(input) => this.setState({ tags: input.target.value })}
                        />
                    </div>
                    <div className="ProjectGitHub">
                        <input
                        type="text"
                        placeholder="http://github.com/..."
                        onChange={(input) => this.setState({ github: input.target.value })}
                        />
                    </div>
                    <div className="Buttons">
                        <button type="button" className="BackToProjects" onClick={() => history.push('/dashboard')}>Back to Projects</button>
                        <button type="button" className="CreateNewProject" onClick={() => console.log(this.state.description)}>Create New Project</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;