import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




const Header = (props) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#005587" }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className="flex">
                        Bruin Source
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header