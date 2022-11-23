import React from 'react';
import { Route, Routes } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { getProducts } from "./api"

const App = () => {

  console.log(getProducts())

    return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;