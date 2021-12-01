//main app

/** setup server **/
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

/** setup database  **/
const {connectdb} = require('./db.js')
connectdb()

/** middleware **/
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8000;

/** main connection pool **/

const user = require('./user.js')
const project = require('./project.js')
const task = require('./task.js')

// Routes

// making this a test of inserting a user into database

/*
insert syntax:
insert into users(id, status, username, password, email, github, year_exp, known_languages, projects_worked) values(1, false, 'newUser', 'testpass', 'newemail', 'newgithub', 1, '{"hello"}'::varchar[], '{1, 3}'::int[])
*/


////////  USER APIs    ////////


/** Register user **/
app.post('/api/register', user.registerUser)

/** Retrieve user by login **/
app.post('/api/login', user.validateLogin)

/** Retrieve all users query **/
app.get('/api/users', user.getUsers);

/** Retrieve user by username **/
app.get('/api/users/:username', user.getUserByUsername);


////////  PROJECT APIs    ////////

/** Create a project **/
app.post('/api/projects/create', project.createProject);

/** Delete a project **/
app.get('/api/projects/:projectId/delete', project.deleteProject);

/** Retrieve all available projects **/
app.get('/api/projects', project.getProjects);

/** Retrieve a project by project id **/
app.get('/api/projects/:projectId', project.getProjectById);

/** Retrieve projects owned by a user **/
app.get('/api/projects/:username', project.getProjectsByUser);

/** Search through all available projects **/
app.get('/api/projects/tags', project.getProjectsByTags);

/** Retrieve collaboration requests to user for projects owned **/
app.get('/api/projects/requests', project.getAllRequests);

/** Retrieve collaboration requests to user for projects owned **/
app.get('/api/projects/requests/:projectId', project.getProjectRequests);

/** Create a request for a project **/
app.get('/api/projects/requests/create', project.createRequest);

/** Approve a request for a project **/
app.get('/api/projects/requests/delete', project.approveRequest);

/** Search for a project **/
app.get('/api/projects/searchproject/:search', project.searchProjects)

////////  TASK APIs    ////////

/** Create a task for a project **/
app.get('/api/projects/:projectId/tasks/create', task.createTask);

/** Delete a task for a project **/
app.get('/api/projects/:projectId/tasks/delete', task.deleteTask);

/** Retrieve all tasks for a project **/
app.get('/api/projects/:projectId/tasks', task.getTasks);


/** Close a task for a project **/
// app.get('/api/projects/:projectId/delete', task.closeTask);

/** Assign a task to a user **/
// app.get('/api/projects/:projectId/:username/tasks', task.assignUserTask);

app.listen(PORT, function(err) {
  if (err) console.log(err);
  console.log(`Server started on port ${PORT}`);
});