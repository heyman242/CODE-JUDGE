import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

axios.defaults.withCredentials = true;

let firstRender = true;

const Welcome = () => {
  const [user, setUser] = useState();
  const [problems, setProblems] = useState([]);
  const history = useNavigate();

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const sednRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProblems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/problems");
      const data = res.data;
      console.log(data); // Check the data received from the API
      return data;
    } catch (error) {
      console.log(error); // Check any errors that occurred during the API call
    }
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.user));
      fetchProblems().then((data) => {
        console.log(data);
        setProblems(data.problems);
      });
    }

    let interval = setInterval(() => {
      refreshToken().then((data) => {
        setUser(data.user);
      });
    }, 1000 * 29);

    return () => clearInterval(interval);
  }, []);

  const handleAddProblem = () => {
    history('/addproblem');
  };

  const handleSolveProblem = (problemId) => {
    history(`/solve/${problemId}`);
  };

  return (
    <div>
      <br/>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {user && <h1 style={{ textAlign: "center" }}>Welcome to Code-Judge {user.name}!</h1>}
        <br/>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProblem}
          style={{ marginTop: "1rem", backgroundColor: "#f50057", color: "#ffffff" }}
        >
          Add Problem
        </Button>
        <br/><br/>
        <table style={{ margin: "auto", fontSize: "30px", border: "1px solid black", width: "80%", height: "auto" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", textAlign: "center" }}>#</th>
              <th style={{ border: "1px solid black", textAlign: "center" }}>Title</th>
              <th style={{ border: "1px solid black", textAlign: "center" }}>Level</th>
              <th style={{ border: "1px solid black", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem._id}>
                <td style={{ border: "1px solid black", textAlign: "center" }}>{index + 1}</td>
                <td style={{ border: "1px solid black", textAlign: "center" }}>{problem.problemName}</td>
                <td style={{ border: "1px solid black", textAlign: "center" }}>{problem.level}</td>
                <td style={{ border: "1px solid black", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSolveProblem(problem._id)}
                    style={{ backgroundColor: "#4caf50", color: "#ffffff" }}
                  >
                    Solve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Welcome;