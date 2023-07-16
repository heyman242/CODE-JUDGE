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
    testInputs: [],
    testOutputs: [],
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'testInputs' || name === 'testOutputs') {
    const arrValue = value.split('\n');
    setInputs((prev) => ({
      ...prev,
      [name]: arrValue,
    }));
  } else {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/addproblem', inputs);
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/user'));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          margin={'auto'}
          width={500}
          display="flex"
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <br/>
          <Typography variant='h4'>ADD PROBLEM</Typography>
          <TextField
            name='problemName'
            onChange={handleChange}
            value={inputs.problemName}
            variant="outlined"
            placeholder='Problem Name'
            margin='normal'
            style={{ width: '100%' }}
          />
          <TextField
            name='problemStatement'
            onChange={handleChange}
            value={inputs.problemStatement}
            variant="outlined"
            placeholder='Problem Statement'
            margin='normal'
            multiline
            rows={10}
            style={{ width: '150%' }}
          />
          <TextField
            name='level'
            onChange={handleChange}
            value={inputs.level}
            variant="outlined"
            placeholder='Level (easy, medium, hard)'
            margin='normal'
            style={{ width: '100%' }}
          />
          <TextField
            name='sampleInputs'
            onChange={handleChange}
            value={inputs.sampleInputs}
            variant="outlined"
            placeholder='Sample Inputs'
            margin='normal'
            style={{ width: '100%' }}
          />
          <TextField
            name='sampleOutputs'
            onChange={handleChange}
            value={inputs.sampleOutputs}
            variant="outlined"
            placeholder='Sample Outputs'
            margin='normal'
            style={{ width: '100%' }}
          />
          <TextField
            name='testInputs'
            onChange={handleChange}
            value={inputs.testInputs.join('\n')}
            variant="outlined"
            placeholder='Testcase Inputs'
            margin='normal'
            style={{ width: '100%' }}
            multiline
            rows={5}
          />
          <TextField
            name='testOutputs'
            onChange={handleChange}
            value={inputs.testOutputs.join('\n')}
            variant="outlined"
            placeholder='Testcase Outputs'
            margin='normal'
            style={{ width: '100%' }}
            multiline
            rows={5}
          />

          <Button variant="contained" type="submit">SUBMIT</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddProblem;
