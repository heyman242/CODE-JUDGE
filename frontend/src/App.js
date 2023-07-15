import './App.css';
import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import Addproblem from './components/Addproblem';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}
          {isLoggedIn && <Route path="/addproblem" element={<Addproblem />} />}
          
          

        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
