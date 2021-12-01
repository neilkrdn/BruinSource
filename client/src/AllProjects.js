import React, { useState } from 'react';
import './AllProjects.css';
import mainLogo from './bruinsource_logo.png'
import searchIcon from './search_icon.png'
/*import { getProjectById } from '../../server/project';*/
import history from './history';
import axios from 'axios';

const AllProjects = (props) => {

    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState(null);


    const ProjectList = () => {
        return fetch('https://localhost:8000/api/projects')
        .then(res => setProjects(res.rows));
    }

    const submitSearch = () => {
        return axios.get(`api/projects/searchproject/${search}`)
        .then(res => setProjects(res.rows));
    }

    const renderTableData = () => {
        return projects.map((project, index) => {
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


        return (
            <div className="AllProjects">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h2> All Projects </h2>
                <form>
                    <input
                    type="text"
                    placeholder="Search from all projects..."
                    onChange={(input) => setSearch(input.target.value)}
                    />
                </form>
                <button type="button" className="Search" onClick={submitSearch}> 
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
                                {renderTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
}

export default AllProjects;