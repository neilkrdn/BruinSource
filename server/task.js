const {client} = require('./db.js')

class Task {
    constructor(id, name, description, tags, status, project_id, date_created, date_due, date_finished, assigned_to){
        this.id = id;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.status = status;
        this.project_id = project_id;
        this.date_created = date_created;
        this.date_due = date_due;
        this.date_finished = date_finished;
        this.assigned_to = assigned_to;
    }
}

// TODO: query add functionality 
function createTask(){}

// TODO: query delete functionality 
function deleteTask(){}

// returns all tasks correlating to a project
function getTasks(req, res) {
    const { projectId } = req.param;
    const query = `select * from tasks where t.project_id = '${projectId}'`;
    client
    .query(query)
    .then(tasks => {
        res.status(200).send(tasks.rows);
    })
    .catch(() => {
        res.status(201).send({msg: `invalid_project_id`});
    })
}

module.exports = {
    createTask,
    deleteTask,
    getTasks
}