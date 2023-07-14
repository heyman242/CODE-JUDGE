import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, Box,Tabs, Tab} from '@mui/material';

const Header = () => {
    const [value, setValue] = useState();
  return (
    <div>
        <AppBar>
            <Toolbar>
                     <Typography varient="h1"><h1>CODE-JUDGE</h1></Typography>
                     <Box sx={{marginLeft:"auto"}}>
                        <Tabs 
                         indicatorColor='secondary'
                         onChange={(e,val)=>setValue(val)}
                         value={value} 
                         textColor='inherit'>
                            <Tab label="Login"/>
                            <Tab label="Sign Up"/>
                        </Tabs>
                     </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header