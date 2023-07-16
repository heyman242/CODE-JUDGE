import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const [jobDetails, setJobDetails] = useState(null);
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  

  useEffect(() => {
    setCode('');
    setOutput('');
    setStatus('');
    setJobId('');
    setJobDetails(null);
    setLanguage('cpp');
  }, [problemId]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = async () => {
    try {
      setOutput('');
      setStatus('Submitting...');
      setJobId('');

      const payload = {
        language,
        code,
        problemId,
      };

      const response = await axios.post('http://localhost:5000/api/solve/:problemId', payload);
      const { filepath, output: compiledOutput } = response.data;

      setJobId(filepath);
      setStatus('Submitted');
      setOutput(compiledOutput);
    } catch (error) {
      console.error(error);
      setStatus('Error');
      setOutput('An error occurred during code compilation.');
    }
  };

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

  if (!problem) {
    return <div>Loading...</div>;
  }

  const { problemName, problemStatement, sampleInputs, sampleOutputs } = problem;

  return (
    <div className="solve-page">
      <div className="problem-details">
        <h1>{problemName}</h1>
        <br/>
        <h3>Problem Statement:</h3>
        <p>{problemStatement}</p>
        <br/>
        <h4>Sample Input:</h4>
        <p>{sampleInputs}</p>
        <br/>
        <h4>Sample Outputs:</h4>
        <p>{sampleOutputs}</p>
        <br/>
        <div className="output-container">
          <p>Status: {status}</p>
          <p>Job ID: {jobId}</p>
          <p>Output:</p>
          <pre>{output}</pre>
        </div>
      </div>
      <div className="code-editor">
        <div className="language-select">
          <label htmlFor="language-select">Language:</label>
          <select id="language-select" value={language} onChange={handleLanguageChange}>
            <option value="cpp">C++</option>
            <option value="py">Python</option>
          </select>
        </div>
        <AceEditor
          mode={language === 'cpp' ? 'c_cpp' : 'python'}
          theme="monokai"
          value={code}
          onChange={handleCodeChange}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          style={{ marginLeft:'70px', height: '500px', width: '90%' }}
        />
        <button onClick={handleSubmit}>Compile Code</button>
        
      </div>
    </div>
  );
};

export default SolvePage;
