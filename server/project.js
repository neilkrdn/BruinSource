const {client} = require('./db.js')

class Project {
    constructor(id, name, description, tags, github, status, date_created, last_updated, author, collaborators){
        this.id = id;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.github = github;
        this.status = status;
        this.date_created = date_created;
        this.last_updated = last_updated;
        this.author = author;
        this.collaborators = collaborators;
    }
}

// TODO: creates a project in db
function createProject(req, res)
{
    const {
        name, 
        description,
        tags,
        github,
        status, 
        date_created, 
        last_updated, 
        author, 
        collaborators
    } = req.body;

    // set status to active
    status = 1;

    const query = 'INSERT INTO projects(name, description, tags, github, status, date_created, last_updated, author, collaborators) values($1, $2, $3::varchar[], $4, $5, $6, $7::varchar[], $8::int[])';
    const vals = [status, username, hashed_password, email, github, year_exp, known_languages_input, projects_worked_input];

    client
    .query(query,vals)
    .catch(err => res.status(201).send(err));

}

// TODO: query delete functionality 
function deleteProject() {}

// returns all active projects
function getProjects(req, res) {
    const query = `select * from projects where p.status = '${1}'`;
    client
    .query(query)
    .then(projects => res.status(200).send(projects.rows))
    .catch(err => res.status(201).send(err))
}

// returns project that correlates to id param
function getProjectById(req, res) {
    const { projectId } = req.params;
    const query = `select * from projects where p.id = '${projectId}'`;
    client
    .query(query)
    .then(projects => res.status(200).send(projects.rows))
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
        userId = user.rows.id;
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

// TODO: return json of all projects that contains at least one tag defined by user
function getProjectsByTags() {}

// TODO: returns json of collaboration requests made on project to owner
function getProjectCollabRequests(req, res){}

module.exports = {
    createProject,
    deleteProject,
    getProjects,
    getProjectById,
    getProjectsByUser,
    getProjectsByTags,
    getProjectCollabRequests
}