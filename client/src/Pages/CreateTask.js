import React from 'react';
import './CreateTask.css';
import mainLogo from '../Files/bruinsource_logo.png'
import history from '../history';
class CreateTask extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = 
        {
            name: null,
            description: null,
            tags: null,
        }
    }

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


    componentDidMount() {
        console.log(history.location.state[0])
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
    }
}

export default CreateTask;