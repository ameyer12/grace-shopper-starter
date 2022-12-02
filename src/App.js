import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useNavigation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Shop, Login, SingleProductView, AddToCartButton, Register, SingleProduct } from './components';
import { getProducts, loginUser, registerUser, getSingleProduct } from "./api"


const App = () => {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(true)
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const results = await getProducts()

    setProducts(results)
  }

  const getCart = async () => {
    const storedCart = JSON.parse(JSON.stringify(window.localStorage.getItem('cart')) || "[]")
    if(!user) {
      if(storedCart.length !== 0) {
        setCart(JSON.parse(storedCart))
        return
      }
      window.localStorage.setItem('cart', JSON.stringify(cart))
    } else if(storedCart.length !== 0) {
      
    }
  }

  useEffect(() => {
    getCart()
  }, [user])
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

    return (
      <div>
          <Navbar cart={cart} setCart={setCart} products={products}/>
          <Routes>
              <Route path="/" element={<Home navigate={navigate} />} />
              <Route path="/shop" element={<Shop products={products} cart={cart} setCart={setCart} AddToCartButton={AddToCartButton} />} />
              <Route path="/shop/product/:productId" element={<SingleProductView products={products} />} />
              <Route path="/login" element={<Login loginUser={loginUser} navigate={navigate} setToken={setToken} />} />
              <Route path="/register" element={<Register registerUser={registerUser} navigate={navigate} setToken={setToken} />} />
              <Route path="products/:productId" element={<SingleProduct getSingleProduct={getSingleProduct} navigate={navigate} />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;