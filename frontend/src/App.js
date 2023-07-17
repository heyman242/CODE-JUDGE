import './App.css';
import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Addproblem from './components/Addproblem';
import SolvePage from './components/SolvePage';
import ViewSubmission from './components/ViewSubmission.js';
import ViewPage from './components/ViewPage';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ViewPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}
          {isLoggedIn && <Route path="/addproblem" element={<Addproblem />} />}
          {isLoggedIn && <Route path="/solve/:problemId" element={<SolvePage />} />}
          {isLoggedIn && <Route path="/viewsubmission" element={<ViewSubmission />} />}

          
          

        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
