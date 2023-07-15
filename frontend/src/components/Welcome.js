import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

let firstRender = true;
const Welcome = () => {
    const [user, setUser] = useState();
    const [problems, setProblems] = useState([]);
    const history = useNavigate();

    const refreshToken = async () => {
        const res = await axios
            .get("http://localhost:5000/api/refresh", {
            withCredentials: true,
            }).catch((err) => console.log(err));

        const data = await res.data;
    return data;
  };

  const sednRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
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
       setProblems(data.problems)});
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

  const handleSolveProblem = () => {

  };




  return <div>
      <br/> 
      {user && <h1> Welcome to Code-Judge {user.name}!</h1>}
      <button onClick={handleAddProblem}>Add Problem</button>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id}>
              <td>{problem.problemName}</td>
              <td>{problem.level}</td>
              <td>
                <button onClick={() => handleSolveProblem(problem._id)}>Solve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>;
};

export default Welcome;