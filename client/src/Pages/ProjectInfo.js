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
import { useAuth } from '../Shared/ProvideAuth';

const useStyles2 = makeStyles({
    custom: {
      color: "black",
      fontFamily: "Georgia"
    }
  });

const ProjectInfo = (props) => {
    const [projectInfo, setProjectInfo] = useState(null)
    const [shouldButtonDisplay, setShouldButtonDisplay] = useState(true)

    if (!history.location.state[0]) {
        history.push('/dashboard')
    }

    const auth = useAuth()

    if (!auth.username) {
        history.push('/')
    }

    useEffect(() => {
        let userid = null
        axios.get(`/api/users/${auth.username}`)
            .then(res => {
                console.log(res)
                if (res.data && res.data != '') {
                    userid = res.data.id
                    axios.get(`/api/projects/projectidpath/${history.location.state[0]}`)
                        .then(res2 => {
                            console.log(res2)
                            var d = new Date(res2.data.date_created)
                            d = d.toDateString()
                            if (res2.data.requests) {
                                let usernames = []
                                let length11 = res2.data.requests.length
                                res2.data.requests.forEach((element, index) => {
                                    axios.get(`/api/users/idtouser/${element}`)
                                        .then(res3 => {
                                            usernames.push(res3.data.username)
                                            if (index === (length11 - 1)) {
                                                console.log(userid)
                                                console.log(usernames)
                                                let myObject = {
                                                    name: res2.data.name,
                                                    date_created: d,
                                                    description: res2.data.description,
                                                    github: res2.data.github,
                                                    requests: usernames
                                                }
                                                if (userid == res.data.author) {
                                                    setShouldButtonDisplay(false)
                                                }
                                                setProjectInfo(myObject)
                                            }
                                        })
                                });
                            } else {
                                let myObject = {
                                    name: res2.data.name,
                                    date_created: d,
                                    description: res2.data.description,
                                    github: res2.data.github,
                                    requests: null
                                }
                                if (userid == res2.data.author) {
                                    setShouldButtonDisplay(false)
                                }
                                setProjectInfo(myObject)
                            }
                        })
                        .catch(err => console.error(err))
                } else {
                    history.push('/')
                }
            })
    }, [])

    const allProjectInfo = () => {
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
                <div className="Buttons">
                    <button type="button" className="BackToProjects" onClick={() => history.push('/dashboard')}>Back to Dashboard</button>
                    { shouldButtonDisplay && 
                        <button type="button" className="RequestAccess">Join Team</button>
                    }
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
        </div>
    );
}

export default ProjectInfo;