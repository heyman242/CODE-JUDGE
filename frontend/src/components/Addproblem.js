import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Box, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AddProblem = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    problemName: "",
    problemStatement: "",
    sampleInputs: "",
    sampleOutputs: "",
    level: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/addproblem', {
      problemName: inputs.problemName,
      problemStatement: inputs.problemStatement,
      sampleInputs: inputs.sampleInputs,
      sampleOutputs: inputs.sampleOutputs,
      level: inputs.level,
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/welcome'));
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
          alignItems={'center'}
        >
          <Typography variant='h3'>ADD PROBLEM</Typography>
          <TextField
            name='problemName'
            onChange={handleChange}
            value={inputs.problemName}
            variant="outlined"
            placeholder='problemName'
            margin='normal'
          />
          <TextField
            name='problemStatement'
            onChange={handleChange}
            type={'problemStatement'}
            value={inputs.problemStatement}
            variant="outlined"
            placeholder='problemStatement'
            margin='normal'
          />
          <TextField
            name='sampleInputs'
            onChange={handleChange}
            type={'sampleInputs'}
            value={inputs.sampleInputs}
            variant="outlined"
            placeholder='sampleInputs'
            margin='normal'
          />
          <TextField
            name='sampleOutputs'
            onChange={handleChange}
            type={'sampleOutputs'}
            value={inputs.sampleOutputs}
            variant="outlined"
            placeholder='sampleOutputs'
            margin='normal'
          />

          <Button variant="contained" type="submit">SUBMIT</Button>

        </Box>
      </form>
    </div>
  );
};

export default AddProblem;
