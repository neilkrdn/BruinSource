import React, { useState } from 'react';
import './CreateTask.css';
import mainLogo from '../Files/bruinsource_logo.png'
import history from '../history';
import axios from 'axios';
import { useAuth } from '../Shared/ProvideAuth';
import { getCurrentDate } from '../Shared/CommonFunctions';

const CreateProject = (props) => {
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [tags, setTags] = useState(null)
    const [project_id, setProjectId] = useState(null)
    const [date_created, setDateCreated] = useState(null)
    const [assigned_user, setAssignedUser] = useState(null)
    const [date_due, setDateDue] = useState(null)
    const [is_finished, setIsFinished] = useState(null)
    const [date_finished, setDateFinished] = useState(null)

    const [alert, setAlert] = useState(null)

    const auth = useAuth()

    const onCreateTask = async () => {

        let userName = auth.username

        if (userName === null) {
            setAlert('Must be logged in to create a task.')
            setTimeout(() => history.push('/'), 3000)
            return
        }

<<<<<<< HEAD
        if (history.location.state[0] == null) {
            return
        }

        let project_id = history.location.state[0];

        let taskData = {
            name: name,
            description: description,
            tags: tags,
            project_id: project_id,
            date_created: getCurrentDate(),
            assigned_user: assigned_user,
            date_due: date_due,
            is_finished: false,
            date_finished: date_finished,
        }
        

        axios.post('/api/projects/tasks/create', taskData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
        history.push('/projectinfo')
=======

    onCreateTask = () => 
    {
        //axios.post('/api/createtask', {name: this.state.name, description: this.state.description, tags: this.state.tags})
        /*
                    setAlert('Task created successfully! Redirecting...')
                    setTimeout(() => {
                        history.push('/taskdashboard')
                    }, 5000);
        */
    }

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
                        onChange={(input) => this.setState({ name: input.target.value })}
                        />
                    </div>
                    <div className="TaskDescription">
                        <textarea
                        type="text"
                        placeholder="Task Description..."
                        required
                        onChange={(input) => this.setState({ description: input.target.value })}
                        />
                    </div>
                    <div className="TaskTags">
                        <input
                        type="text"
                        placeholder="Task Tags (comma-separated)..."
                        required
                        onChange={(input) => this.setState({ tags: input.target.value })}
                        />
                    </div>
                    <div className="Buttons">
                        <button type="button" className="BackToTasks" onClick={() => history.push('/taskdashboard')}>Back to Tasks</button>
                        <button type="button" className="CreateNewTask" /* onClick={this.onCreateTask} */>Create New Task</button>
                    </div>
                </form>
            </div>
        );
>>>>>>> e6f075e (New changes)
    }

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
                    onChange={(input) => setName(input.target.value)}
                    />
                </div>
                <div className="TaskDescription">
                    <textarea
                    type="text"
                    placeholder="Task Description..."
                    required
                    onChange={(input) => setDescription(input.target.value)}
                    />
                </div>
                <div className="TaskTags">
                    <input
                    type="text"
                    placeholder="Task Tags (comma-separated)..."
                    required
                    onChange={(input) => setTags(input.target.value)}
                    />
                </div>
                <div className="Buttons">
                    <button type="button" className="BackToTasks" onClick={() => history.push('/taskdashboard')}>Back to Tasks</button>
                    <button type="button" className="CreateNewTask" onClick={onCreateTask}>Create New Task</button>
                </div>
            </form>
        </div>
    );
}

export default CreateProject;