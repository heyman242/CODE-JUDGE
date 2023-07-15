//SolvePage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const SolvePage = () => {
  const [problem, setProblem] = useState(null);
  const { problemId } = useParams();

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
        
      </div>
      <div className="code-editor">
        <AceEditor
            theme="monokai"
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            style={{marginLeft:'150px', width: '80%', height: '650px' }}
        />
      </div>
    </div>
  );
};

export default SolvePage;