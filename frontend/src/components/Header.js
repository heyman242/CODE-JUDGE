import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, Box,Tabs, Tab} from '@mui/material';
import {Link} from "react-router-dom";

const Header = () => {
    const [value, setValue] = useState();
  return (
    <div>
        <AppBar position="sticky">
            <Toolbar>
                     <Typography varient="h1">CODE-JUDGE</Typography>
                     <Box sx={{marginLeft:"auto"}}>
                        <Tabs 
                         indicatorColor='secondary'
                         onChange={(e,val)=>setValue(val)}
                         value={value} 
                         textColor='inherit'>
                            <Tab to="/login" LinkComponent={Link} label="Login"/>
                            <Tab to="/signup" LinkComponent={Link} label="Sign Up"/>
                        </Tabs>
                     </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header