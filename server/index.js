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

values = [123, false, 'hello', 'test', 'test', 'test', 1, {},{}]




app.get('/getuserinfo', (req,res) => {
  const {username} = req.body;
  let query = `select * from users where id = ${username}`
  client.query(query)
  .then(res => console.log(res))
  .catch(err => console.error(err))
});



const insertUserQuery = 'INSERT INTO users(id, status, username, password, email, github, year_exp, known_languages, projects_worked) values($1, $2, $3, $4, $5, $6, $7, $8::varchar[], $9::int[])'
// note - have to format $8 (known_languages) to be in {1,2,3} format and same for projects_worked
app.post('/test', (req,res) => { // use req.body to receive params from frontend
  console.log(req.body)
  const { id, status, username, password, email, github, year_exp, known_languages, projects_worked } = req.body;
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

  const toInsertVals = [id, status, username, password, email, github, year_exp, known_languages_input, projects_worked_input]

  client.query(insertUserQuery, toInsertVals)
  .then(res => console.log(res))
  .catch(err => console.error(err))
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));