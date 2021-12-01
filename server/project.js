const { client, formatArrayToSql } = require('./db.js');

class Project {
    constructor(id, name, description, tags, github, date_created, last_updated, author, collaborators, requests) {
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

function validateProjectName(projectName) {

    //check if project name doesn't have spaces
    const numSpaces = projectName
        .split('')
        .map(char => /\s/.test(char))
        .reduce((curr, prev) => curr + prev);

    if (numSpaces === 0) return true;
    else return false;

}

// create a project in db
function createProject(req, res) {
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

    //let projectNameValid = validateProjectName(name);

    if (!name) {
        res.status(201).send({ msg: 'name_invalid' })
        return
    };

    if (!description) description = '';
    if (!github) github = '';



    // we make them enter them with comments on the front end...

    formattedTags = formatArrayToSql(tags);
    formattedCollaboraters = formatArrayToSql(collaborators);
    formattedRequests = formatArrayToSql(requests);

    let finalAuthor = parseInt(author)

    if (author && name) {
        const query = 'INSERT INTO projects(name, description, tags, github, date_created, last_updated, author, collaborators) values($1, $2, $3::varchar[], $4, $5, $6, $7, $8::int[])';
        const vals = [name, description, formattedTags, github, date_created, last_updated, finalAuthor, collaborators];
        client
            .query(query, vals)
            .catch(err => {
                console.log(err)
                res.status(201).send(err)
            });
    } else {
        res.status(201).send({ msg: 'author_invalid' });
    }
}

// search for a project
function searchProjects(req, res) {
    const { search } = req.params;
    const query = `select * from projects p where p."name" like '%${search}%'`;

    client
        .query(query)
        .then(projects => {
            console.log(projects)
            res.status(200).send(projects.rows)
        })
        .catch(err => {
            console.log(err)
            res.status(201).send(err)
        })
}

// delete project from db
function deleteProject(req, res) {
    const { id } = req.params;
    const query = `DELETE FROM projects p where p.id = '${id}'`;

    client
        .query(query)
        .catch(err => res.status(201).send({ msg: 'invalid_id' }));
}

// returns all active projects
function getProjects(req, res) {
    const query = `select * from projects`;
    client
        .query(query)
        .then(projects => {
            res.status(200).send(projects.rows)
        })
        .catch(err => res.status(201).send(err))
}

// returns project that correlates to id param
function getProjectById(req, res) {
    const { projectId } = req.params;
    const query = `select * from projects p join users u on p.author = u.id where p.id = '${projectId}'`;
    client
        .query(query)
        .then(projects => res.status(200).send(projects.rows[0]))
        .catch(err => res.status(201).send(err))
}

// returns projects being worked on by a user
async function getProjectsByUser(req, res) {
    const { username } = req.params;

    console.log('called')

    let userValid = false;
    const idQuery = `select * from users u where u.username = '${username}'`;
    let userId = null
    await client
        .query(idQuery)
        .then(user => {
            if (user.rowCount === 0) {
                res.status(201).send({ msg: `invalid_username` });
            }
            userValid = true;
            userId = user.rows[0].id;
        })
        .catch(() => {
            res.status(201).send({ msg: `invalid_username` });
            return
        })

    if (userValid) {
        const isAuthorQuery = `select *, p.id as project_id from projects p join users u on p.author = u.id where p.author = '${userId}'`;
        client
            .query(isAuthorQuery)
            .then(projects => {
                console.log(projects)
                res.status(200).send(projects.rows);
            })
            .catch(() => {
                res.status(201).send({ msg: `userId_invalid` })
            })
    }
}

// TODO: return all projects that contains at least one tag defined by user
function searchProjectsByTags(req, res) { 

    const { tags } = req.body;
    
    const query = `select * from projects`;
    client
    .query(query)
    .then(projects => {
        let allProjects = projects.rows;
        let projectsWithTags = {};

        for (const project in allProjects){
            for (const tag in tags){
                if (project.tags.includes(tag)){
                    if (!projectsWithTags[project.id]){
                        projectsWithTags[project.id] = 1;
                    } else {
                        projectsWithTags[project.id] += 1;
                    }
                }
            }
        }
        
        res.status(200).send(projectsWithTags);
    })
    .catch(err => {
        console.log(err);
        res.status(201).send(err);
    })
}

// returns all collaboration requests for all projects
function getAllRequests(req, res) {
    const query = `select * from requests`;
    client
    .query(query)
    .then(requests => res.status(200).send(requests.rows))
    .catch(err => res.status(201).send(err));
}

// returns all collaboration requests made on a project
function getProjectRequests(req, res) {
    const { projectId } = req.params;
    const query = `select * from projects p where p.id = '${projectId}'`;
    client
        .query(query)
        .then(project => res.status(200).send(project.rows[0].requests))
        .catch(err => res.status(201).send(err));
}

function createRequest(req, res) {

    const { user, project_id, date_created } = req.body;
    
    if (user && project_id){

        date_created = new Date();

        const query = `INSERT INTO projects(user, project_id, date_created) values($1, $2, $3)`;
        const vals = [user, project_id, date_created];

        client
        .query(query, vals)
        .catch(err => {
            console.log(err);
            res.status(201).send(err);
        });
    } else {
        res.status(201).send({msg: 'invalid_input'});
    }
}

async function approveRequest(req, res) {

    const { requestId } = req.param;

    let userId = null;
    let projectId = null;

    const userQuery = `select * from requests r where r.id = '${requestId}'`;
    await client
    .query(userQuery)
    .then(request => {
        userId = request.rows[0].id;
        projectId = request.rows[0].project_id;
    })
    .catch(err => {
        console.log(err);
        res.status(201).send(err);
    });

    let updatedCollaborators = null;
    const getProjectQuery = `select * from projects p where p.id = '${projectId}'`;
    await client
    .query(getProjectQuery)
    .then(project => {
        updatedCollaborators = project.rows[0].collaborators;
        console.log(typeof(updatedCollaborators));
        // find way to add to this array
    });

    const modifyUserQuery = `update projects set collaborators = '${updatedCollaborators}' where id = '${projectId}'`;
    client
    .query(modifyUserQuery)
    .catch(err => {
        console.log(err);
        res.status(201).send(err);
    });
}

function deleteRequest(req, res) {
    
    const { requestID } = req.param;

    const query = `delete from requests r where r.id = '${requestID}'`;
    client
    .query(query)
    .catch(err => {
        console.log(err);
        res.status(201).send(err);
    });
}

module.exports = {
    createProject,
    deleteProject,
    getProjects,
    getProjectById,
    getProjectsByUser,
    getAllRequests,
    getProjectRequests,
    createRequest,
    approveRequest,
    deleteRequest,
    searchProjects,
    searchProjectsByTags,
}