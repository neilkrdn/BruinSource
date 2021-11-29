import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Login from './Login.js';
import Dashboard from './Dashboard.js'
import CreateTask from './CreateTask.js'
import CreateProject from './CreateProject.js'
import Register from './Register.js'
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="" exact component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/createtask" component={CreateTask} />
                    <Route path="/createproject" component={CreateProject} /> 
                </Switch>
            </Router>
        )
    }
}
