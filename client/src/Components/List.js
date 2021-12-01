import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton'
import './List.css'
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';

const MyList = (props) => {
    const { data } = props;
    const renderItems = () => {
        console.log(data)

        if (data) {
            return data.map(each => {
                console.log(each)
                return (<ListItem
                >
                    {each}
                    <Button variant="outlined" color="">
                        Accept
                    </Button>
                    <Button variant="outlined" color="">
                        Deny
                    </Button>
                </ListItem>
                );
            })
        } else {
            return null
        }

        return null
    }

    return (
        <div className="ListContainer">
            <List sx={{ width: '30%' }}>
                {renderItems()}
            </List>
        </div>
    )
}
export default MyList