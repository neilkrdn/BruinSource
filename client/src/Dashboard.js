import React from 'react';
import './Dashboard.css';
import mainLogo from './bruinsource_logo.png'

class Dashboard extends React.Component {

    // Note: gonna need to dynamically allocate headers based on the db

    render() {
        return (
            <div className="Dashboard">
                <img src={mainLogo} className="MainLogo" alt="mainLogo"/>
                <h1 className="Title">MY PROJECTS</h1>
                <form>
                    <input
                    type="text"
                    placeholder="Search for a project..."
                    />
                </form>
                <button type="button" className="Search"></button>
                <button type="button" className="Create">CREATE A PROJECT</button>
                <h2 className="Name">NAME</h2>
                <h2 className="Owner">OWNER</h2>
                <h2 className="Date">DATE JOINED</h2>
                <h2 className="Collaborators">COLLABORATORS</h2>

            </div>

        );
    }
}

export default Dashboard;