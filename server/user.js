const {client} = require('./db.js')
const bcrypt = require('bcrypt')

class User {
    constructor(id, status, username, password, email, github, known_languages, year_exp, projects_worked){
        this.id = id;
        this.status = status;
        this.status = username;
        this.password = password;
        this.email = email;
        this.github = github;
        this.known_languages = known_languages;
        this.year_exp = year_exp;
        this.projects_worked = projects_worked;
    }
}

// adds a user to database and returns the user object in json 
function registerUser(req, res) {
    const { status, 
            username, 
            password, 
            email, 
            github, 
            year_exp, 
            known_languages, 
            projects_worked 
    } = req.body;
    
    /* janky way to get known languages and projects worked array into format to submit */
    known_languages_input = '{'
    known_languages.map(each => {
        known_languages_input += (each + ',');
    });
    known_languages_input = known_languages_input.substring(0, known_languages_input.length - 1);
    known_languages_input += '}';
    projects_worked_input = '{';
    projects_worked.map(each =>{
        projects_worked_input += (each + ',');
    });
    projects_worked_input= projects_worked_input.substring(0, projects_worked_input.length - 1);
    projects_worked_input += '}';

    // encrypt password
    hashed_password = bcrypt.hash(password, 10);

    const query = 'INSERT INTO users(status, username, password, email, github, year_exp, known_languages, projects_worked) values($1, $2, $3, $4, $5, $6, $7::varchar[], $8::int[])';
    const vals = [status, username, hashed_password, email, github, year_exp, known_languages_input, projects_worked_input];

    client
    .query(query,vals)
    .then(user => {
        res.status(200).send(user)
    })
    .catch(err => res.status(201).send(err));
}

function validateLogin(req, res){
    const {username, password} = req.body;
    const query = `select * from users where u.username = '${username}'`;

    client
    .query(query)
    .then(user => {
        if (bcrypt.compare(password, user.rows.password)){
            res.status(200).send({msg: 'success'});
        } else {
            res.status(201).send({msg: 'dne'});
        }
    })
    .catch(err => res.status(201).send({msg: 'dne'}))
}


// TODO: be able to modify password and then ecrypt it into database
function modifyPassword() {

}

// returns json of all existing users (both active and inactive)
function getUsers(req, res){
    const query = `select * from users`;
    client
        .query(query)
        .then(users => {
            if (users.rows.length == 0){
                res.status(201).send(`No Users found`);
            } else {
                res.status(200).send(users.rows);
            }
        })
        .catch(err => res.status(201).send(err));
}

// returns json of all active users
function getActiveUsers(req, res){
    const query = `select * from users u where u.status = '${true}'`; // active users have a status of true
    client
    .query(query)
    .then(users => {
        if (users.rows.length == 0){
            res.status(201).send(`No Active Users found`);
        } else {
            res.status(200).send(users.rows);
        }
    })
    .catch(err => res.status(201).send(err));
}
// returns json of user found by given username
function getUserByUsername(req, res){
    const { username } = req.params;
    const query = `select * from users u where u.username = '${username}'`;
    client
    .query(query)
    .then(user => {
        res.status(200).send(user.rows);
    })
    .catch(() => {
        res.status(201).send({msg: `dne`});
    })
}

/*
   some bs to add for what we would do to improve this app but didn't get
   time to do would be to implement hard delete vs soft delete -- usually
   industry prefers soft deletes (i.e. using status = true / false)
   instead of deleting straight from the table on each operation because
   it's risky or something idfk. 
*/

// deletes a user from database and returns that user object in json
function deleteUser(req, res){
    const { username } = req.body;
    const query = `DELETE FROM users where username = '${username}'`; 
    
    client
    .query(query)
    .then(user => {
        res.status(200).send(user);
    })
    .catch(err => res.status(201).send({msg: 'dne'}));
}

// TODO: query modify functionality
function modifyUser(){}

module.exports = {
    registerUser,
    validateLogin,
    getUsers,
    getActiveUsers,
    getUserByUsername,
    deleteUser,
    modifyUser
}