import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useNavigation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Shop, Login, SingleProductView, AddToCartButton } from './components';
import { getProducts, loginUser } from "./api"


const App = () => {
  const [cart, setCart] = useState([])
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
      setCart(JSON.parse(storedCart))
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
          <Navbar cart={cart} setCart={setCart} products={products}/>
          <Routes>
              <Route path="/" element={<Home navigate={navigate} />} />
              <Route path="/shop" element={<Shop products={products} cart={cart} setCart={setCart} AddToCartButton={AddToCartButton} />} />
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