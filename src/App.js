import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useNavigation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
<<<<<<< HEAD
import { Shop, Login, Register, SingleProduct } from './components';
import { getProducts, loginUser, registerUser, getSingleProduct } from "./api"
=======
import { Shop, Login } from './components';
import { getProducts, loginUser } from "./api"
import SingleProductView from './components/SingleProductView';
>>>>>>> 21dc137c61d1fb81261493a7bb3e824688062091

const App = () => {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const results = await getProducts()

    setProducts(results)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

    return (
      <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home navigate={navigate} />} />
              <Route path="/shop" element={<Shop products={products} />} />
              <Route path="/shop/product/:productId" element={<SingleProductView products={products} />} />
              <Route path="/login" element={<Login loginUser={loginUser} navigate={navigate} />} />
              <Route path="/register" element={<Register registerUser={registerUser} navigate={navigate} />} />
              <Route path="products/:productId" element={<SingleProduct getSingleProduct={getSingleProduct} navigate={navigate} />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;