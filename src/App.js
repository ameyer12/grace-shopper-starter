import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useNavigation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Shop, Login, SingleProductView, AddToCartButton, Register, SingleProduct } from './components';
import { getProducts, loginUser, registerUser, getSingleProduct, getUserCart, addToUserCart } from "./api"


const App = () => {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  console.log(cart)
  const fetchProducts = async () => {
    const results = await getProducts()

    setProducts(results)
  }
 
  const getCart = async () => {
    const storedCart = JSON.parse(window.localStorage.getItem('cart'))
    const token = window.localStorage.getItem('token')
    let userCart = []
    if(token !== 'null') {
      const dbCart = await getUserCart(token)
      userCart = dbCart
      console.log('getting cart user cart')
    }
    if(token === 'null') {
      if(storedCart.length !== 0) {
        setCart(storedCart)
        return
      }
      window.localStorage.setItem('cart', JSON.stringify(cart))
    } else if(storedCart.length !== 0 && userCart.length !== 0) {
      let i = 0;
      while(storedCart.length - 1 >= i) {
        const itemInCart = userCart.find((item) => item.itemId === storedCart[i].itemId)
        if(itemInCart === undefined) {
          userCart.push(storedCart[i])
          await addToUserCart(token, storedCart[i])
          setCart(userCart)
        }
        i++
      }
    } else if(storedCart.length === 0 && userCart.length !== 0) {
      setCart(userCart)
    } else if(storedCart.length !== 0 && userCart.length === 0) {
      setCart(storedCart)
      let i = 0
      while(storedCart.length - 1 >= i) {
        await addToUserCart(token, storedCart[i])
        i++
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(cart))
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
              <Route path="/login" element={<Login loginUser={loginUser} navigate={navigate} setCart={setCart} />} />
              <Route path="/register" element={<Register registerUser={registerUser} navigate={navigate} />} />
              <Route path="products/:productId" element={<SingleProduct getSingleProduct={getSingleProduct} navigate={navigate} />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;