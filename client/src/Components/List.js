import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton'
import './List.css'
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItemAvatar } from '@mui/material';
import { Avatar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import React, { useState } from 'react'
import axios from 'axios';


const MyList = (props) => {
    const { data, isOwner, projectID } = props;
    const text = {
        fontFamily: 'Georgia'
    }

    const deleteUser = (userID, projectID) => {
        axios.post('/api/projects/requests/remove', { userId: userID, projectID: projectID })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const renderItems = () => {
        if (data) {
            return data.map(each => {
                console.log(each)
                return (<ListItem
                >
                    <ListItemAvatar>
                        <Avatar>
                            <PersonOutlineIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primaryTypographyProps={{ style: text }}
                        primary={`${each[0]} ${each[1]}`}
                    >
                    </ListItemText>
                </ListItem>
                );
            })
        } else {
            return (
                <ListItem>
                    <ListItemText primaryTypographyProps={{ style: text }}
                        primary="No team members exist.">
                    </ListItemText>
                </ListItem>
            );
        }

        return null
    }

    return (
        <div className="ListContainer">
            <Typography sx={{ fontFamily: 'Georgia', fontWeight: 'bold' }} variant="h4" gutterBottom component="div">
                Team Members
            </Typography>
            <List sx={{ width: '100%' }}>
                {renderItems()}
            </List>
        </div>
    )
}
export default MyList