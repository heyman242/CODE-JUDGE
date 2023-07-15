import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState();
  const history = useNavigate();

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

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
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sednRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);


  const handleAddProblem = () => {
  history('/addproblem');
};



  return <div>
      <br/> 
      {user && <h1> Welcome to Code-Judge {user.name}!</h1>}
      <button onClick={handleAddProblem}>Add Problem</button>
  </div>;
};

export default Welcome;