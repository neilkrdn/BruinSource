import React, { useEffect, useState } from 'react';
import './ProjectInfo.css';
import mainLogo from '../Files/bruinsource_logo.png'
import history from '../history.js'
import axios from 'axios';
import { red } from '@mui/material/colors';
import { Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Bars } from 'react-loading-icons';
import DeleteIcon from '@mui/icons-material/Delete';
import MyList from '../Components/List';

const useStyles2 = makeStyles({
    custom: {
      color: "black",
      fontFamily: "Georgia"
    }
  });

const ProjectInfo = (props) => {
    const [projectInfo, setProjectInfo] = useState(null)

    if (!history.location.state[0]) {
        history.push('/dashboard')
    }

    useEffect(() => {
        axios.get(`/api/projects/projectidpath/${history.location.state[0]}`)
            .then(res => {
                console.log(res)
                var d = new Date(res.data.date_created)
                d = d.toDateString()
                if (res.data.requests) {
                    let usernames = []
                    let length11 = res.data.requests.length
                    res.data.requests.forEach((element, index) => {
                        axios.get(`/api/users/idtouser/${element}`)
                            .then(res => {
                                usernames.push(res.data.username)
                                if (index === (length11 - 1)) {
                                    console.log(usernames)
                                    let myObject = {
                                        name: res.data.name,
                                        date_created: d,
                                        description: res.data.description,
                                        github: res.data.github,
                                        requests: usernames
                                    }
                                    setProjectInfo(myObject)
                                }
                            })
                    });
                } else {
                    let myObject = {
                        name: res.data.name,
                        date_created: d,
                        description: res.data.description,
                        github: res.data.github,
                        requests: null
                    }
                    setProjectInfo(myObject)
                }
            })
            .catch(err => console.error(err))
    }, [])

    const allProjectInfo = () => {
        console.log('called')
        return (
            <React.Fragment>
                <div className="MainInfoGrid">
                    <div className="ProjectText">
                        <Typography variant="h3" gutterBottom component="div" sx={{fontFamily: 'Georgia', fontWeight: 'bold'}}>
                            {projectInfo.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div" sx={{fontFamily: 'Georgia'}}>
                            Date Created: {projectInfo.date_created}
                        </Typography>
                        <Typography variant="body1" gutterBottom component="div" sx={{fontFamily: 'Georgia'}}>
                            {projectInfo.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom component="div" sx={{fontFamily: 'Georgia'}}>
                            <a href={`${projectInfo.github}`}>Project Github</a>
                        </Typography>
                    </div>
                    <div>
                        <MyList data={projectInfo.requests}></MyList>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div className="ProjectInfo">
            <img src={mainLogo} className="MainLogo" alt="mainLogo" />
            {projectInfo ?
                allProjectInfo()
                :
                <div className="LoadingDiv"> <Bars fill="#005587" /> </div>
            }
            <div className="Buttons">
                <button type="button" className="BackToProjects" onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
                <button type="button" className="RequestAccess">Request Access</button>
            </div>
        </div>
    );
}

export default ProjectInfo;