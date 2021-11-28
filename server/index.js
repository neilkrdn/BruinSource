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
const {client, connectdb} = require('./db.js')
connectdb()

/** middleware **/
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8000;

/** main connection pool **/

const user = require('./user.js')
const { } = require('./project.js')
const { } = require('./task.js')

// Routes

// making this a test of inserting a user into database

/*
insert syntax:
insert into users(id, status, username, password, email, github, year_exp, known_languages, projects_worked) values(1, false, 'newUser', 'testpass', 'newemail', 'newgithub', 1, '{"hello"}'::varchar[], '{1, 3}'::int[])
*/

/** Register user **/
app.post('api/register', user.registerUser)

/** Retrieve user by login **/
app.get('api/login')

/** Retrieve all users query **/
app.get('/api/users', user.getUsers);

/** Retrieve all users query **/
app.get('/api/users/active', user.getActiveUsers);

/** Retrieve user by username **/
app.get('/api/users/:username', user.getUserByUsername)

/** Delete a User **/
app.post('/api/users/delete', user.deleteUser) 

/**

  More routes we'll probably have to write in thinking about the front-end for anybody working on backend:
  retreive user by project id
  retrieve user by task id
  retrieve user by set of known languages (filtering by languages essentially)

  change username / password
  modify known languages, project ids, etc. 

 */

app.listen(PORT, function(err) {
  if (err) console.log(err);
  console.log(`Server started on port ${PORT}`);
});

/*
USERS TABLE
  note for yash - I set the username to unique key so that database doesn't allow duplicate usernames by default
  id is also a primary key 
  I also set github to be able to be null - are we requiring github for all users?
  (note - only username is unique id rn - should I Write SQL to make email unique?)

  database is all done being setup with your structure - only diff is that username is unique key
  

  maybe try to write some stuff here to link projects to users, tasks to projects?
*/