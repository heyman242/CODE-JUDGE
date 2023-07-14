import React, { useState } from 'react';
import {Button, Box, TextField, Typography} from '@mui/material';


const Signup = () => {
    const [inputs, setinputs] = useState({
        name:"",
        email:"",
        password:"",
    });
    const handleChange= (e) => {
        setinputs((prev) => ({
            ...prev,
            [e.target.name]:e.target.value,
        }));
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
         
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
                <Typography variant='h2'>Signup</Typography>
                <TextField name='name'
                onChange={handleChange}
                value={inputs.name}
                variant="outlined" 
                placeholder='Name' 
                margin='normal' />
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

                <Button variant="contained" type="submit">Signup</Button>

            </Box>
        </form>
    </div>
  )
}

export default Signup