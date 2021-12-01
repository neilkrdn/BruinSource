const { client, formatArrayToSql } = require('./db.js')
const bcrypt = require('bcrypt')

class User {
    constructor(id, username, password, email, github, known_languages, year_exp, projects_worked){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.github = github;
        this.known_languages = known_languages;
        this.year_exp = year_exp;
        this.projects_worked = projects_worked;
    }
}

function validateUsername(username) {
    // check if username is null and if it already exists in db
    if (username.length != 0) {
        client
        .query(`select * from users u where u.username = '${username}'`)
        .catch(err => {
            // error means that username doesn't already exist, so chosen username is valid
            return true;
        })
    } else {
        console.log('here')
        return true;
    }
}

function validateEmail(email) {
    // check if email is not null and is associated with a university
    if (email.length != 0 && email.substring(email.length - 4) == '.edu') {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {
    // check if password has at least one upper case character
    const numUpper = password
                        .split('')
                        .map(char => /[A-Z]/.test(char))
                        .reduce((curr,prev) => curr + prev);

    // check if password has at least one special case character
    const numSpecial = password
                        .split('')
                        .map(char => /[^a-zA-Z\d]/.test(char))
                        .reduce((curr,prev) => curr + prev);

    // check i password has at least one number
    const numDigits = password
                        .split('')
                        .map(char => /\d/.test(char))
                        .reduce((curr,prev) => curr + prev);

    if (password.length >= 8 && numUpper > 0 && numSpecial > 0 && numDigits > 0) return true;
    else return false;
}

// adds a user to database and returns the user object in json 
async function registerUser(req, res) {
    const { username, 
            password, 
            email, 
            github, 
            year_exp, 
            known_languages, 
            projects_owned 
    } = req.body;

    // validate username input
    /*
    let usernameValid = validateUsername(username);
    if (!usernameValid){
        res.status(201).send({msg: 'username_taken'});
        return:
    }
    */

    // validate password input
    let passwordValid = validatePassword(password);
    if (passwordValid) {
        // encrypt password
        hashed_password = await bcrypt.hash(password, 10)
    } else {
        res.status(201).send({ msg: 'invalid_password' })
        return;
    }

    // validate email input
    let emailValid = validateEmail(email);
    if (!emailValid) {
        res.status(201).send({ msg: 'invalid_email' })
        return;
    }

    // set default to empty string
    if (!github) github = '';

    // set default to 0 years of experience if no input
    if (!year_exp) year_exp = 0;

    known_languages_input = formatArrayToSql(known_languages);
    projects_owned_input = formatArrayToSql(projects_owned)

    // make query if inputs are all valid
    if (usernameValid && emailValid && passwordValid) { 
        const query = 'INSERT INTO users(status, username, password, email, github, year_exp, known_languages, projects_worked) values($1, $2, $3, $4, $5, $6, $7::varchar[], $8::int[])';
        const vals = [username, hashed_password, email, github, year_exp, known_languages_input, projects_owned_input];

        client
        .query(query,vals)
        .catch(err => res.status(201).send(err));
    }
}

function validateLogin(req, res){
    const { username, password } = req.body;
    const query = `select * from users u where u.username = '${username}'`;

    client
        .query(query)
        .then(user => {
            bcrypt.compare(password, user.rows[0].password, (err, result) => {
                if (err) {
                    res.status(201).send({ msg: 'invalid_password' });
                    return
                }
                if (result) {
                    res.status(200).send({ msg: 'success' });
                    return
                } else {
                    res.status(201).send({ msg: 'invalid_password' });
                    return
                }
            })
        })
        .catch(err => {
            res.status(201).send({ msg: 'invalid_username' })})
}

// deletes a user from database and returns that user object in json
function deleteUser(req, res){
    const { username } = req.params;
    const query = `DELETE FROM users u where u.username = '${username}'`; 
    
    client
    .query(query)
    .catch(err => res.status(201).send({msg: 'invalid_username'}));
}

// returns json of all existing users 
function getUsers(req, res){
    const query = `select * from users`;
    client
        .query(query)
        .then(users => {
            res.status(200).send(users.rows);
        })
        .catch(err => res.status(201).send(err));
}

// returns json of user found by given username
function getUserByUsername(req, res) {
    const { username } = req.params;
    const query = `select * from users u where u.username = '${username}'`;
    client
    .query(query)
    .then(user => {
        res.status(200).send(user.rows[0]);
    })
    .catch(err => {
        res.status(201).send({msg: `invalid_username`});
    })
}

module.exports = {
    registerUser,
    formatArrayToSql,
    validateLogin,
    getUsers,
    getUserByUsername,
    deleteUser,
}