const {client} = require('./db.js')

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

// for following functions, we can use what luke previously wrote in index.js and tweak it a tad bit to use OOP

// TODO: query add functionality 
function addUser(){}

// TODO: query delete functionality 
function deleteUser(){}

// TODO: query modify functionality
function modifyUser(){}

module.exports = {
    addUser,
    deleteUser,
    modifyUser
}