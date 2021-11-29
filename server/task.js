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

// TODO: query modify functionality to modify due date
function modifyDateDue(){}

// TODO: query modify functionality to update when a task is finished
function updateDateFinished(){}

// TODO: query modify functionality to assign a developer to a task 
function assignTask(){}

// TODO: query modify functionality to delete assigned developer 
function deleteAssignee(){}

module.exports = {
    createTask,
    deleteTask,
    modifyDateDue,
    updateDateFinished,
    assignTask,
    deleteAssignee
}