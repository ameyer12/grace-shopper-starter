import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useNavigation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Shop, Login } from './components';
import { getProducts, loginUser } from "./api"
import SingleProductView from './components/SingleProductView';

const App = () => {
  const [cart, setCart] = useState([{
    itemId: null,
    qty: null
  }])
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const results = await getProducts()

    setProducts(results)
  }

  const getCart = async () => {
    if(user) {
      const storedCart = JSON.parse(JSON.stringify(window.localStorage.getItem('cart')) || "[]")
      if(!storedCart) {
        window.localStorage.setItem('cart', JSON.stringify(cart))
        return
      }
      setCart(storedCart)
      window.localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  useEffect(() => {
    getCart()
  }, [])
  useEffect(() => {
    fetchProducts()
  }, [])

    return (
      <div>
          <Navbar cart={cart} setCart={setCart}/>
          <Routes>
              <Route path="/" element={<Home navigate={navigate} />} />
              <Route path="/shop" element={<Shop products={products} />} />
              <Route path="/shop/product/:productId" element={<SingleProductView products={products} />} />
              <Route path="/login" element={<Login loginUser={loginUser} navigate={navigate} />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;