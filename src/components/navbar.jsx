import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const Navbar = (props) => {
    console.log('WHERE IS MY BAR AT', props)
    return (
        <div>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">a kanban boooaooaoard</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}