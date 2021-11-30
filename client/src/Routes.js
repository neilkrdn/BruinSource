import React, { Component } from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import Login from './Login.js';
import Dashboard from './Dashboard.js'
import CreateTask from './CreateTask.js'
import CreateProject from './CreateProject.js'
import Register from './Register.js'
import TaskInfo from './TaskInfo.js'
import ProjectInfo from './ProjectInfo'
import TaskDashboard from './TaskDashBoard.js'
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/createtask" component={CreateTask} />
                    <Route exact path="/createproject" component={CreateProject} /> 
                    <Route exact path="/taskinfo" component={TaskInfo} />
                    <Route exact path="/projectinfo" component={ProjectInfo} />
                    <Route exact path="/taskdashboard" component={TaskDashboard}/>
                </Switch>
            </Router>
        )
    }
}
