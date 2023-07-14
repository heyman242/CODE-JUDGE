import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Box, TextField, Typography} from '@mui/material';
import axios from 'axios';

const Login = () => {
  const history = useNavigate();
    const [inputs, setinputs] = useState({  
        email:"",
        password:"",
    });
    const handleChange= (e) => {
        setinputs((prev) => ({
            ...prev,
            [e.target.name]:e.target.value,
        }));
    };

    const sendRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/login', {
            email : inputs.email,
            password: inputs.password,
        }).catch(err => console.log(err));

        const data = await res.data;
        return data;  
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        sendRequest().then(() => history('/user'));    
    };
  return (
    <div>
        
        <form onSubmit={handleSubmit}>
            <Box 
            margin={'auto'} 
            width={300} 
            display="flex" 
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}>

                <Typography variant='h3'>Login</Typography>

                <TextField name='email' 
                onChange={handleChange}
                type={'email'} 
                value={inputs.email} 
                variant="outlined" 
                placeholder='Email'
                margin='normal' />

                <TextField name='password'
                onChange={handleChange}
                type={'password'} 
                value={inputs.password}
                variant="outlined" 
                placeholder='Password'
                margin='normal' />

                <Button 
                variant="contained" 
                type="submit">Login</Button>

            </Box>
        </form>
    </div>
  )
}

export default Login