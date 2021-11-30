import React from 'react';
import './CreateProject.css';
import mainLogo from './bruinsource_logo.png'
import history from './history';
import axios from 'axios';

class CreateProject extends React.Component {
    constructor(props)
    {
        super(props);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = yyyy + '-' + dd + '-' + mm;

        this.state = 
        {
            name: null,
            description: null,
            tags: null,
            github: null,
            author: null,
            date_created: today,
            last_updated: today,
            collaborators: [],
            requests: [],

            alert: null,
        }
    }

 /*   testLogs = () => {


        console.log(this.state.name);
        console.log(this.state.description);
        console.log(this.state.tags);
        console.log(this.state.github);
        console.log(this.state.author);
        console.log(this.state.date_created);
        console.log(this.state.last_updated);
        console.log(this.state.collaborators);
        console.log(this.state.requests);
    }
*/


     onCreateProject = () => 
      {

        axios.post('/api/projects/create', 
        {
            name: this.state.name, 
            description: this.state.description, 
            tags: this.state.tags, 
            github: this.state.github,
            date_created: this.state.date_created,
            last_updated: this.state.last_updated,
            author: this.state.author,
            collaborators: this.state.collaborators,
                requests: this.state.requests,
        })
        
        //        this.setState({
       //             alert: 'Project created successfully! Redirecting...'
       //         })
        
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
                        <button type="button" className="CreateNewProject" onClick={this.onCreateProject()}>Create New Project</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;