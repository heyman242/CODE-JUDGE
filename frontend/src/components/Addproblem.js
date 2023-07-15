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
    testInputs:"",
    testOutputs:"",
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
      testInputs:inputs.testInputs,
      testOutputs:inputs.testOutputs,
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
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
      width={500} // Increase the width of the box to 500 (or any desired value)
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
        type={'problemStatement'}
        value={inputs.problemStatement}
        variant="outlined"
        placeholder='Problem Statement'
        margin='normal'
        multiline // Enable multiline input
        rows={10} // Adjust the number of rows (increase or decrease as needed)
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
        type={'sampleInputs'}
        value={inputs.sampleInputs}
        variant="outlined"
        placeholder='Sample Inputs'
        margin='normal'
        style={{ width: '100%' }}
      />
      <TextField
        name='sampleOutputs'
        onChange={handleChange}
        type={'sampleOutputs'}
        value={inputs.sampleOutputs}
        variant="outlined"
        placeholder='Sample Outputs'
        margin='normal'
        style={{ width: '100%' }}
      />
      <TextField
        name='testInputs'
        onChange={handleChange}
        type={'testInputs'}
        value={inputs.testInputs}
        variant="outlined"
        placeholder='Testcase Inputs'
        margin='normal'
        style={{ width: '100%' }}
      />
      <TextField
        name='testOutputs'
        onChange={handleChange}
        type={'testOutputs'}
        value={inputs.testOutputs}
        variant="outlined"
        placeholder='Testcase Outputs'
        margin='normal'
        style={{ width: '100%' }}
      />

      <Button variant="contained" type="submit">SUBMIT</Button>
    </Box>
  </form>
</div>

  );
};

export default AddProblem;
