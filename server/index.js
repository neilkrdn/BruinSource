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
app.get('/api/register', user.registerUser);

/** Delete a User **/
app.get('/api/users/:username/delete', user.deleteUser)

/** Retrieve user by login **/
app.get('/api/login', user.validateLogin);

/** Retrieve all users query **/
app.get('/api/users', user.getUsers);

/** Retrieve all users query **/
app.get('/api/users/active', user.getActiveUsers);

/** Retrieve user by username **/
app.get('/api/users/:username', user.getUserByUsername);


////////  PROJECT APIs    ////////

/** Create a project **/
app.get('/api/projects/create', project.createProject);

/** Delete a project **/
app.get('/api/projects/delete', project.deleteProject);

/** Retrieve all available projects **/
app.get('/api/projects/active', project.getProjects);

/** Retrieve a project by project id **/
app.get('/api/projects/active/:projectId', project.getProjectById);

/** Retrieve projects owned by a user **/
app.get('/api/projects/active/:username', project.getProjectsByUser);

/** Search through all available projects **/
app.get('/api/projects/active/tags', project.getProjectsByTags);

/** Retrieve collaboration requests to user for projects owned **/
app.get('/api/projects/active/:username/requests', project.getProjectCollabRequests);


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