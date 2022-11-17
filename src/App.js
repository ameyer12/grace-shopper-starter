import React from 'react';
import { Route, Routes } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
    return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
      </div>
    );
  }
  
  export default App;