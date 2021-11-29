import React from 'react';
import './Project_Overview.css';
/* CHANGE LOGO */
import mainLogo from './bruinsource-logo.png'

class Project_Overview extends React.Component {
    render() {
        return (
            <div className="Project_Overview">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <form className="Headings">
                    <h1> PROJECT NAME</h1>
                </form>
                <form className="Inputs">
                    <div className="Search">
                        <input 
                        type="text" 
                        placeholder=" Search for a task"
                        required
                        />
                    </div>
                    <form className="Labels">
                    <p>TASK CONTRIBUTOR DATE CREATED TASKS</p>
                    </form>
                    <form className="Tasks">
                        <ul>
                            <li>Task 1</li>
                            <li>Tast 2</li>
                        </ul>
                    </form>
                    <div className="Buttons">
                        <button type="button" className="BackToProjects">Back to Projects</button>
                        <button type="button" className="CreateTask">Create New Task</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Project_Overview;