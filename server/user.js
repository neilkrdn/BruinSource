const { client } = require('./db.js')
const bcrypt = require('bcrypt')

class User {
    constructor(id, status, username, password, email, github, known_languages, year_exp, projects_worked) {
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

function validateUsername(username) {
    // check if username is null and if it already exists in db
    if (username.length != 0) {
        client
            .query(`select * from users where u.username = '${username}'`)
            .catch(err => {
                // error means that username doesn't already exist, so chosen username is valid
                return true
            })
    } else {
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
    const hasUpper = (password) => {
        let num = password
            .split('')
            .map(char => /[A-Z]/.test(char))
            .reduce((a, b) => a + b);
        return num > 0;
    }

    // check if password has at least one special case character
    const hasSpecial = (password) => {
        let num = password
            .split('')
            .map(char => /[^a-zA-Z\d]/.test(char))
            .reduce((a, b) => a + b);
        return num > 0;
    }

    // check i password has at least one number
    const hasNum = (password) => {
        let num = password
            .split('')
            .map(char => /\d/.test(char))
            .reduce((a, b) => a + b);
        return num > 0;
    }

    if (password.length >= 8 && hasUpper && hasSpecial && hasNum) {
        return true;
    } else {
        return false;
    }
}

// format projects worked into sql type
function formatProjectsWorked(projectsWorked) {
    let formatedKnownLanguages = '{'

    if (projectsWorked.includes(',')) {
        projectsWorked = projectsWorked.split(',')
        projectsWorked.map(each => {
            formatedKnownLanguages += (each + ',');
        });

        formatedKnownLanguages = formatedKnownLanguages.substring(0, formatedKnownLanguages.length - 1);
        formatedKnownLanguages += '}';
    } else {
        formatedKnownLanguages += projectsWorked;
        formatedKnownLanguages += '}';
    }

    return formatedKnownLanguages;

    let formattedProjectsWorked = '{';

    projectsWorked.map(each => {
        formattedProjectsWorked += (each + ',');
    });

    formattedProjectsWorked = formattedProjectsWorked.substring(0, formattedProjectsWorked.length - 1);
    formattedProjectsWorked += '}';
    return formattedProjectsWorked;
}

// format known languages into sql type
function formatKnownLanguages(knownLanguages) {
    let formatedKnownLanguages = '{'

    if (knownLanguages.includes(',')) {
        knownLanguages = knownLanguages.split(',')
        knownLanguages.map(each => {
            formatedKnownLanguages += (each + ',');
        });

        formatedKnownLanguages = formatedKnownLanguages.substring(0, formatedKnownLanguages.length - 1);
        formatedKnownLanguages += '}';
    } else {
        formatedKnownLanguages += knownLanguages;
        formatedKnownLanguages += '}';
    }

    return formatedKnownLanguages;
}

// adds a user to database and returns the user object in json 
async function registerUser(req, res) {
    const { username,
        password,
        email,
        github,
        year_exp,
        known_languages,
        projects_worked
    } = req.body;


    console.log(req.body)

    // set status to active
    const status = 1;

    // validate username input
    // let usernameValid = validateUsername(username);
    //if (!usernameValid){
    //  res.status(201).send({msg: 'username_taken'});
    //    return
    //}

    // validate password input
    let passwordValid = validatePassword(password);
    if (passwordValid) {
        // encrypt password
        hashed_password = await bcrypt.hash(password, 10)
    } else {
        res.status(201).send({ msg: 'invalid_password' })
        return
    }

    // validate email input
    let emailValid = validateEmail(email);
    if (!emailValid) {
        res.status(201).send({ msg: 'invalid_email' })
        return
    }

    // set default to 0 years of experience
    if (!year_exp) {
        console.log(year_exp)
        year_exp = 0;
    }

    known_languages_input = formatKnownLanguages(known_languages);

    projects_worked_input = formatProjectsWorked(projects_worked)
    // make query if inputs are all valid
    if (/*usernameValid*/  emailValid && passwordValid) {
        const query = 'INSERT INTO users(username, password, email, github, year_exp, known_languages, projects_worked) values($1, $2, $3, $4, $5, $6::varchar[], $7::int[])';
        const vals = [username, hashed_password, email, github, year_exp, known_languages_input, projects_worked_input];
        client
            .query(query, vals)
            .then(user => {
                res.status(200).send(user)
            })
            .catch(err => res.status(201).send(err))
    }
}

function validateLogin(req, res) {
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


// TODO: be able to modify password and then ecrypt it into database
function modifyPassword() {

}

// returns json of all existing users (both active and inactive)
function getUsers(req, res) {
    const query = `select * from users`;
    client
        .query(query)
        .then(users => {
            if (users.rows.length == 0) {
                res.status(201).send(`No Users found`);
            } else {
                res.status(200).send(users.rows);
            }
        })
        .catch(err => res.status(201).send(err));
}

// returns json of all active users
function getActiveUsers(req, res) {
    const query = `select * from users u where u.status = '${true}'`; // active users have a status of true
    client
        .query(query)
        .then(users => {
            if (users.rows.length == 0) {
                res.status(201).send(`No Active Users found`);
            } else {
                res.status(200).send(users.rows);
            }
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
            res.status(200).send(user.rows);
        })
        .catch(() => {
            res.status(201).send({ msg: `invalid_username` });
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
function deleteUser(req, res) {
    const { username } = req.body;
    const query = `DELETE FROM users where username = '${username}'`;

    client
        .query(query)
        .then(user => {
            res.status(200).send(user);
        })
        .catch(err => res.status(201).send({ msg: 'invalid_username' }));
}

module.exports = {
    registerUser,
    validateLogin,
    getUsers,
    getActiveUsers,
    getUserByUsername,
    deleteUser,
}