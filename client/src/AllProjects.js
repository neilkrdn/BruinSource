import React from 'react';
import './AllProjects.css';
import mainLogo from './bruinsource_logo.png'
import searchIcon from './search_icon.png'
/*import { getProjectById } from '../../server/project';*/
import history from './history';

class AllProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          projects: []
        }
    }
    ProjectList() {
        return fetch('https://localhost:8000/api/projects')
        .then(res =>this.setState({projects: res.rows}));
    }
    renderTableData() {
        return this.state.projects.map((project, index) => {
            const {id, name, description, tags, date_created, last_updated, author, collaborators, requests} = project
            return (
                <tr key={name}>
                    <td>{name}</td>
                    <td>{author}</td>
                    <td>{date_created}</td>
                    <td>{collaborators}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="AllProjects">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h2> All Projects </h2>
                <form>
                    <input
                    type="text"
                    placeholder="Search from all projects..."
                    />
                </form>
                <button type="button" className="Search"> 
                    <img src={searchIcon} width="50px" alt="searchIcon" ></img>
                </button>
                <button type="button" className="Create" onClick={() => history.push('/createproject')}>Create New Project</button>
                <button type="button" className="BackToProjects" onClick={() => history.push('/dashboard')}>Back to My Projects</button>
                
                <div className="ProjectList">
                    <table className="ProjectListTable">
                        <thead className="ProjectListTableHead">
                            <tr>
                                <td>NAME</td>
                                <td>OWNER</td>
                                <td>DATE JOINED</td>
                                <td>COLLABORATORS</td>
                            </tr>
                        </thead>
                        <tbody>
                                {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AllProjects;