import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, Box,Tabs, Tab} from '@mui/material';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {authActions} from "../store"
axios.defaults.withCredentials =true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const sendLougoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null , {
      withCredentials: true
    });
    if(res.status === 200){
      return res
    }
    return new Error("Unable to logout! Please try again")

  }
  const handleLogout = () => {
    sendLougoutReq().then(() => dispatch(authActions.logout()))

  }
  const [value, setValue] = useState();
  return (
    <div>
        <AppBar position="sticky">
            <Toolbar>
                     <Typography varient="h1">
                      <h1><Link to="/user" style={{ textDecoration: "none", color: "inherit" }}>
                      CODE-JUDGE </Link>
                      </h1>
                    </Typography>

                     <Box sx={{marginLeft:"auto"}}>
                        <Tabs 
                         indicatorColor='secondary'
                         onChange={(e,val)=>setValue(val)}
                         value={value} 
                         textColor='inherit'>
                            { !isLoggedIn && <><Tab to="/login" LinkComponent={Link} label="Login"/>
                            <Tab to="/signup" LinkComponent={Link} label="Sign Up"/> </>}
                            { isLoggedIn &&
                            <Tab onClick={handleLogout} to="/" LinkComponent={Link} label="Log out "/>
                            }
                        </Tabs>
                     </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header