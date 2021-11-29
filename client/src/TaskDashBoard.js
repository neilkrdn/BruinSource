import React from 'react';
import './TaskDashBoard.css';
import mainLogo from './bruinsource_logo.png'
import searchIcon from './search_icon.png'

const {client} = require('./db.js')

class TaskDashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          tasks: this.TaskList()
        }
    }

    TaskList() {
        return $.getJSON('https://')
        .then(function(data) {
          return data.results;
        });
    }

    render() {
        return (
            <div className="TaskDashBoard">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h2> Tasks </h2>
                <form>
                    <input
                    type="text"
                    placeholder="Search for a task..."
                    />
                </form>
                <button type="button" className="Search"> 
                    <img src={searchIcon} width="50px" alt="searchIcon" ></img>
                </button>
                <button type="button" className="Create">CREATE A TASK</button>
                <div className="TaskList">
                    <table className="TaskListTable">
                        <thead className="TaskListTableHead">
                            <tr>
                                <td>TASK</td>
                                <td>CONTRIBUTOR</td>
                                <td>DATE CREATED</td>
                                <td>STATUS</td>
                            </tr>
                        </thead>
                        <tbody>
                            for task in this.state.tasks {
                                <tr>
                                    <td>task.id</td>
                                    <td>task.assigned_to[0]</td>
                                    <td>task.date_created</td>
                                    <td>task.status</td>
                                </tr>
                            });
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TaskDashBoard;