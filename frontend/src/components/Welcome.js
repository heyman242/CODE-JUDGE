import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell, Button,Paper, Typography } from '@mui/material';

axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [problems, setProblems] = useState(() => {
    const storedProblems = localStorage.getItem('problems');
    return storedProblems ? JSON.parse(storedProblems) : [];
  });
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
    if (!user) {
      sednRequest().then((data) => {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      });
    }

    if (problems.length === 0) {
      fetchProblems().then((data) => {
        console.log(data);
        setProblems(data.problems);
        localStorage.setItem('problems', JSON.stringify(data.problems));
      });
    }

    let interval = setInterval(() => {
      refreshToken().then((data) => {
        setUser(data.user);
      });
    }, 1000 * 29);

    return () => clearInterval(interval);
  },);

  const handleAddProblem = () => {
    history('/addproblem');
  };

  const handleSolveProblem = (problemId) => {
    history(`/solve/${problemId}?userId=${user._id}`); 
  };

  const handleViewSubmission = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/submissions/${user._id}`);
    const { submissions } = response.data;
    console.log(submissions); 

    history(`/viewsubmission?userId=${user._id}`, { submissions });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <br/>
       <Button
          variant="contained"
          color="primary"
          onClick={handleAddProblem}
          style={{  
          marginTop: '20px',
            marginLeft: '150px',
          backgroundColor: "#f50057", 
          color: "#ffffff",
        border: '4px solid #000000',
            outline: 'none', }}
        >
          Add Problem
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewSubmission}
          style={{  marginTop: '20px',
            marginLeft: '800px',
            backgroundColor: "#1e88e5",
             color: "#ffffff",
            border: '4px solid #000000',
            outline: 'none', }}
        >
            View Submissions
        </Button>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {user && <h1 style={{ textAlign: "center",border: '4px solid #000000' }}>Welcome to Code-Judge {user.name}!</h1>}
        <br/>
       
        
        <br/><br/>
        <Paper sx={{ margin: "auto", width: "70%", borderRadius: "10px", overflow: "hidden" }}>
  <Table sx={{ width: "100%", border: "4px solid #000" }}>
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <Typography variant="h5">#</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">Title</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">Level</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography variant="h5">Action</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {problems.map((problem, index) => (
        <TableRow key={problem._id}>
          <TableCell align="center">
            <Typography variant="body1">{index + 1}</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="body1">{problem.problemName}</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="body1">{problem.level}</Typography>
          </TableCell>
          <TableCell align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSolveProblem(problem._id)}
              sx={{
                backgroundColor: "#4caf50",
                border: '4px solid #000000',
                outline: 'none',
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
            >
              <Typography variant="button">Solve</Typography>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Paper>

      </div>
    </div>
  );
};

export default Welcome;
