// main app

const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

console.log(process.env.DB_STRING)
const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8000;




/*
if u want to use db at all use following import
*/


const { Client } = require('pg');
const { query } = require('express');
const { resolveSoa } = require('dns');

const client = new Client({
  connectionString: process.env.DB_STRING,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

/*
structure for users: add

id
status
username
password
email
github
known_languages
year_exp
projects_worked
*/


// making this a test of inserting a user into database


/*
insert syntax:
insert into users(id, status, username, password, email, github, year_exp, known_languages, projects_worked) values(1, false, 'newUser', 'testpass', 'newemail', 'newgithub', 1, '{"hello"}'::varchar[], '{1, 3}'::int[])
*/

app.post('/getuserinfo', (req,res) => {
  const {username} = req.body;
  let query = `select * from users u where u.username = '${username}'`
  client.query(query)
  .then(response => res.send(response))
  .catch(err => console.error(err))
});




const insertUserQuery = 'INSERT INTO users(status, username, password, email, github, year_exp, known_languages, projects_worked) values($1, $2, $3, $4, $5, $6, $7::varchar[], $8::int[])'
// note - have to format $8 (known_languages) to be in {1,2,3} format and same for projects_worked
app.post('/insertuser', (req,res) => { // use req.body to receive params from frontend
  console.log(req.body)
  const { status, username, password, email, github, year_exp, known_languages, projects_worked } = req.body;
  /* janky way to get known languages and projects worked array into format to submit */
  known_languages_input = '{'
  known_languages.map(each => {
    known_languages_input += (each + ',')
  })
  known_languages_input = known_languages_input.substring(0, known_languages_input.length - 1)
  known_languages_input += '}'
  projects_worked_input = '{'
  projects_worked.map(each =>{
    projects_worked_input += (each + ',')
  })
  projects_worked_input= projects_worked_input.substring(0, projects_worked_input.length - 1)
  projects_worked_input += '}'

  const toInsertVals = [status, username, password, email, github, year_exp, known_languages_input, projects_worked_input]

  client.query(insertUserQuery, toInsertVals)
  .then(response => res.send(response))
  .catch(err => console.error(err))
});


app.post('/deleteuser', (req, res) => {
    const {username} = req.body
    const query = `DELETE FROM users where username = '${username}'` 
    client.query(query)
    .then(response => res.send(response))
    .catch(err => res.send(err))
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/*
USERS TABLE
  note for yash - I set the username to unique key so that database doesn't allow duplicate usernames by default
  id is also a primary key
  I also set github to be able to be null - are we requiring github for all users?
  (note - only username is unique id rn - should I Write SQL to make email unique?)

  database is all done being setup with your structure - only diff is that username is unique key


  maybe try to write some stuff here to link projects to users, tasks to projects?

*/