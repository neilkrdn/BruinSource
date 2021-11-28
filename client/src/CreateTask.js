import React from 'react';
import './CreateTask.css';
import mainLogo from './bruinsource_logo.png'

class CreateProject extends React.Component {
    render() {
        return (
            <div className="CreateTask">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h2> Create A New Task </h2>
                <form className="Inputs">
                    <div className="TaskName">
                        <input 
                        type="text" 
                        placeholder="Task Name..."
                        required
                        />
                    </div>
                    <div className="TaskDescription">
                        <textarea
                        type="text"
                        placeholder="Task Description..."
                        required
                        />
                    </div>
                    <div className="TaskTags">
                        <input
                        type="text"
                        placeholder="Task Tags (comma-separated)..."
                        required
                        />
                    </div>
                    <div className="Buttons">
                        <button type="button" className="BackToTasks">Back to Projects</button>
                        <button type="button" className="CreateNewTask">Create New Task</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateProject;