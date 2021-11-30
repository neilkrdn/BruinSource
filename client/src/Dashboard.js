import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import mainLogo from './bruinsource_logo.png'
import searchIcon from './search_icon.png'
import history from './history';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Dashboard = () => {
    const [projects, setProjects] = useState(null)
    /*
   for project in this.state.projects {
                                <tr>
                                    <td>project.id</td>
                                    <td>project.author</td>
                                    <td>task.date_created</td>
                                    <td>task.collaborators</td>
                                </tr>
                            });


    */

    const howard = [
        {
            id: 1,
            author: "Howard",
            date_created: "1/1/1",
            collaborators: "meme"
        },
        {
            id: 1,
            author: "Howard",
            date_created: "1/1/1",
            collaborators: "meme"
        },
        {
            id: 1,
            author: "Howard",
            date_created: "1/1/1",
            collaborators: "meme"
        },
        {
            id: 1,
            author: "Howard",
            date_created: "1/1/1",
            collaborators: "meme"
        },
    ]

    useEffect(() => {
        setProjects(howard)
    }, [])

    const renderProjects = () => {
        if (projects) {
            return projects.map(project => {
                return (
                    <tr>
                        <td>{project.id}</td>
                        <td>{project.author}</td>
                        <td>{project.date_created}</td>
                        <td>{project.collaborators}</td>
                    </tr>
                )
            })
        } else {
            return <p>Loading projects...   </p>
        }
    }

    return (
        <div className="Dashboard">
            <img src={mainLogo} className="MainLogo" alt="mainLogo" />
            <h2> My Projects </h2>
            <form>
                <input
                    type="text"
                    placeholder="Search for a project..."
                />
            </form>
            <button type="button" className="Search">
                <img src={searchIcon} width="50px" alt="searchIcon" ></img>
            </button>
            <button type="button" className="Create" onClick={() => history.push('/createproject')}>Create New Project</button>
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
                        {renderProjects()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;