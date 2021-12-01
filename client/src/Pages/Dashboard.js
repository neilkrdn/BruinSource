import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import mainLogo from '../Files/bruinsource_logo.png'
import searchIcon from '../Files/search_icon.png'
/*import { getProjectById } from '../../server/project';*/
import history from '../history';
import axios from 'axios';
import { useAuth } from '../Shared/ProvideAuth';
import { Bars } from 'react-loading-icons'

const Dashboard = (props) => {

    const [projects, setProjects] = useState(null);
    const [search, setSearch] = useState(null);

    const [dataLoaded, setDataLoaded] = useState(false)

    const submitSearch = () => {
        axios.get(`api/projects/searchproject/${search}`)
            .then(res => {
                setProjects(res.data)
            });
    }

    const auth = useAuth()

    const getUserProjects = () => {

        if (auth.username == null) {
            return 
        }

        axios.get(`/api/projects/user/${auth.username}`)
            .then(res => {
                console.log(res)
                setProjects(res.data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (projects) {
            setDataLoaded(true)
            if (projects.length == 0) {
                // make some text to show that none exist for this search term
            }
        }
    }, [projects])

    useEffect(() => {
        getUserProjects()
    }, [])


    const renderTableData = () => {
        console.log(projects)
        if (!projects || projects.length == 0) {
            return <tr> No entries exist for this search. </tr>
        } else {
            return projects.map((project, index) => {
                const { id, name, description, tags, date_created, last_updated, author, collaborators, requests } = project

                var d = new Date(date_created)
                d = d.toDateString()

                var collaboratorsExist = false
                if (collaborators && collaborators.length) {
                    if (collaborators.length > 0) {
                        collaboratorsExist = true
                    }
                }

                return (
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{author}</td>
                        <td>{d}</td>
                        <td>{collaboratorsExist ? collaborators : 'No collaborators'}</td>
                    </tr>
                )
            })
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
            <button type="button" className="AllProjects" onClick={() => history.push('/allprojects')}>See All Projects</button>

            <div className="ProjectList">
                {!dataLoaded ?
                    <div className="LoadingDiv"> <Bars fill="#005587" /> </div>
                    :
                    <table className="ProjectListTable">
                        <thead className="ProjectListTableHead">
                            <tr>
                                <td>Name</td>
                                <td>Owner</td>
                                <td>Date Started</td>
                                <td>Collaborators</td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableData()}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}



export default Dashboard;