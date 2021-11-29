import React from 'react';
import './Dashboard.css';
import mainLogo from './bruinsource_logo.png'
import searchIcon from './search_icon.png'
import history from './history';

class Dashboard extends React.Component {

    // Note: gonna need to dynamically allocate headers based on the db
    // I think these should be in a table
    render() {
        return (
            <div className="Dashboard">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
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
            </div>
        );
    }
}

export default Dashboard;