import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Shop, Login, Register, SingleProduct, AddToCartButton } from './components';
import { getProducts, loginUser, registerUser, getSingleProduct, getUserCart, addToUserCart } from "./api"


const getCart = async (setCart, token) => { // I think it should work now, let me know if you still have errors -Elpidio
  const localCart = window.localStorage.cart || '[]'
  const storedCart = JSON.parse(localCart)

  let userCart = []
  console.log(token)
  if(token === "null" || token === 'undefined' || !token) {
    if(storedCart.length !== 0) {
      setCart(storedCart)
      return
    }
  if(token && token !== 'null' && token !== 'undefined') {
    const dbCart = await getUserCart(token)
    console.log(dbCart)
    userCart = dbCart
  }
    window.localStorage.setItem('cart', JSON.stringify([]))
  } else if(storedCart.length !== 0 && userCart.length !== 0) {
    let i = 0;
    while(storedCart.length - 1 >= i) {
      const itemInCart = userCart.find((item) => item.itemId === storedCart[i].itemId)
      if(itemInCart === undefined) {
        userCart.push(storedCart[i])
        await addToUserCart(token, storedCart[i])
        console.log(userCart, 'testing cart')
      }
      i++
    }
    setCart(userCart)
    window.localStorage.setItem('cart', JSON.stringify(userCart))
  } else if(storedCart.length === 0 && userCart.length !== 0) {
    setCart(userCart)
    window.localStorage.setItem('cart', JSON.stringify(userCart))
  } else if(storedCart.length !== 0 && userCart.length === 0) {
    console.log('here')
    setCart(storedCart)
    let i = 0
    while(storedCart.length - 1 >= i) {
      console.log(storedCart[i])
      await addToUserCart(token, storedCart[i])
      i++
    }
    window.localStorage.setItem('cart', JSON.stringify(storedCart))
  }
}



const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const results = await getProducts()

    setProducts(results)
  }
 
  

  useEffect(() => {
    getCart(setCart, token)
  }, [setCart, token])


  useEffect(() => {
    fetchProducts()
  }, [])

    return (
      <div>
          <Navbar cart={cart} setCart={setCart} products={products}/>
          <Routes>
              <Route path="/" element={<Home navigate={navigate} />} />
              <Route path="/shop" element={<Shop products={products} cart={cart} setCart={setCart} AddToCartButton={AddToCartButton}/>} />
              <Route path="/login" element={<Login loginUser={loginUser} navigate={navigate} setCart={setCart} setToken={setToken} />} />
              <Route path="/register" element={<Register registerUser={registerUser} navigate={navigate} />} />
              <Route path="/products/:productId" element={<SingleProduct getSingleProduct={getSingleProduct} navigate={navigate} cart={cart} setCart={setCart} AddToCartButton={AddToCartButton} />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;