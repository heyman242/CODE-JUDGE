import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Button, Select, MenuItem, Typography } from '@mui/material';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const SolvePage = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [jobId, setJobId] = useState('');
  const [problem, setProblem] = useState(null);
  const [customInput, setCustomInput] = useState('');

  const location = useLocation();
  const { problemId } = useParams();
  const userId = new URLSearchParams(location.search).get('userId');

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/solve/${problemId}`);
        const data = res.data;
        setProblem(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblemDetails();
  }, [problemId]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value);
  };

  const handleCompile = async () => {
    try {
      setOutput('');
      setStatus('Compiling...');
      setJobId('');

      const payload = {
        language,
        code,
        problemId,
        customInput,
      };

      const response = await axios.post(`http://localhost:5000/api/compile/${problemId}`, payload);
      const { filepath, output: compiledOutput } = response.data;

      setJobId(filepath);
      setStatus('Compilation Success');
      setOutput(compiledOutput);
    } catch (error) {
      console.error(error);
      setStatus('Error');
      setOutput('An error occurred during code compilation.');
    }
  };

  const handleSubmit = async () => {
    try {
      setStatus('Submitting...');

      const payload = {
        language,
        code,
        problemId,
        customInput,
        userId, // Include the userId in the payload
      };

      const response = await axios.post(`http://localhost:5000/api/submit/${problemId}`, payload);
      const { verdict } = response.data;

      setStatus(verdict === 'success' ? 'Success' : 'Error');
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
      setStatus('Error');
    }
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  const { problemName, problemStatement, sampleInputs, sampleOutputs } = problem;

  return (
    <Box className="solve-page">
      <Box className="problem-details">
        <Typography variant="h1">{problemName}</Typography>
        <Box className="problem-statement">
          <Typography variant="h3">Problem Statement:</Typography>
          <Typography variant="body1">{problemStatement}</Typography>
        </Box>
        <Box className="sample-io-container">
          <Box className="sample-input">
            <Typography variant="h4">Sample Input:</Typography>
            <pre>{sampleInputs}</pre>
          </Box>
          <Box className="sample-output">
            <Typography variant="h4">Sample Output:</Typography>
            <pre>{sampleOutputs}</pre>
          </Box>
        </Box>
        <Box className="language-select">
          <Typography htmlFor="language-select" variant="h5">Language:</Typography>
          <Select id="language-select" value={language} onChange={handleLanguageChange}>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="py">Python</MenuItem>
          </Select>
        </Box>
        <Box className="output-container">
          <Typography>Status: {status}</Typography>
          <Typography>Output:</Typography>
          <pre>{output}</pre>
        </Box>
      </Box>
      <Box className="code-editor"> 
        <AceEditor
          mode={language === 'cpp' ? 'c_cpp' : 'python'}
          theme="monokai"
          value={code}
          onChange={handleCodeChange}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          style={{ marginLeft: '70px', height: '670px', width: '90%' }}
        />
        <Box className="custom-input-container">
          <textarea
            placeholder='Custom input'
            value={customInput}
            onChange={handleCustomInputChange}
            className="custom-textarea"
            rows={1}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCompile}
          style={{
            marginTop: '-100px',
            marginLeft: '600px',
            backgroundColor: '#4caf50',
            color: '#ffffff',
          }}
        >
          Compile
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            marginTop: '-140px',
            marginLeft: '700px',
            backgroundColor: '#4caf50',
            color: '#ffffff',
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SolvePage;
