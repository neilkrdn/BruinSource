const { client, formatArrayToSql } = require('./db.js');

class Project {
    constructor(id, name, description, tags, github, date_created, last_updated, author, collaborators, requests){
        this.id = id;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.github = github;
        this.date_created = date_created;
        this.last_updated = last_updated;
        this.author = author;
        this.collaborators = collaborators;
        this.requests = requests;
    }
}

function validateProjectName(projectName){

    //check if username doesn't have spaces
    const numSpaces = projectName
                        .split('')
                        .map(char => /\s/.test(char))
                        .reduce((curr,prev) => curr + prev);

    if (numSpaces == 0) return true;
    else return false;
    
}

// create a project in db
function createProject(req, res)
{
    const {
        name, 
        description,
        tags,
        github,
        date_created, 
        last_updated, 
        author, 
        collaborators,
        requests
    } = req.body;

    console.log(req.body)

    let projectNameValid = validateProjectName(name);

    if (!projectNameValid) res.status(201).send({msg: 'name_invalid'});

    if (!description) description = '';
    if (!github) github = '';



    // we make them enter them with comments on the front end...
    
    formattedTags = formatArrayToSql(tags); 
    formattedCollaboraters = formatArrayToSql(collaborators);
    formattedRequests = formatArrayToSql(requests);
    

    let finalAuthor = parseInt(author)

    if (author && projectNameValid){
        const query = 'INSERT INTO projects(name, description, tags, github, date_created, last_updated, author, collaborators) values($1, $2, $3::varchar[], $4, $5, $6, $7, $8::int[])';
        const vals = [ name, description, formattedTags, github, date_created, last_updated, finalAuthor, collaborators];
        client
        .query(query,vals)
        .catch(err => {console.log(err)
            res.status(201).send(err)});
    } else {
        res.status(201).send({msg: 'author_invalid'});
    }
}

// delete project from db
function deleteProject(req, res) {
    const { id } = req.params;
    const query = `DELETE FROM projects p where p.id = '${id}'`; 
    
    client
    .query(query)
    .catch(err => res.status(201).send({msg: 'invalid_id'}));
}

// returns all active projects
function getProjects(req, res) {
    const query = `select * from projects`;
    client
    .query(query)
    .then(projects => res.status(200).send(projects.rows))
    .catch(err => res.status(201).send(err))
}

// returns project that correlates to id param
function getProjectById(req, res) {
    const { projectId } = req.params;
    const query = `select * from projects p where p.id = '${projectId}'`;
    client
    .query(query)
    .then(projects => res.status(200).send(projects.rows[0]))
    .catch(err => res.status(201).send(err))
}

// returns projects being worked on by a user
function getProjectsByUser(req, res) {
    const { username } = req.params;

    let userId = 0;
    let userValid = false;
    const idQuery = `select * from users u where u.username = '${username}'`;
    client
    .query(idQuery)
    .then(user => {
        userValid = true;
        userId = user.rows[0].id;
    })
    .catch(() => {
        res.status(201).send({msg: `invalid_username`});
    })

    if (userValid){
        const isAuthorQuery = `select * from projects p where p.author = '${userId}'`;
        client
        .query(isAuthorQuery)
        .then(projects => {
            res.status(200).send(projects.rows);
        })
        .catch(() => {
            res.status(201).send({msg: `userId_invalid`})
        })
    }
}

// TODO: return all projects that contains at least one tag defined by user
function getProjectsByTags() {}

// returns all collaboration requests for all projects
function getAllRequests(req, res){
    const query = `select * from projects`;
    client
    .query(query)
    .then(projects => res.status(200).send(projects.rows.requests))
    .catch(err => res.status(201).send(err));
}

// returns all collaboration requests made on a project
function getProjectRequests(req, res){
    const { projectId } = req.params;
    const query = `select * from projects p where p.id = '${projectId}'`;
    client
    .query(query)
    .then(project => res.status(200).send(project.rows[0].requests))
    .catch(err => res.status(201).send(err));
}

function createRequest(req, res) {



}

function approveRequest(req, res) {

    
}

module.exports = {
    createProject,
    deleteProject,
    getProjects,
    getProjectById,
    getProjectsByUser,
    getProjectsByTags,
    getAllRequests,
    getProjectRequests,
    createRequest,
    approveRequest
}