import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Shop, Login, Register, SingleProduct, AddToCartButton, Admin, AdminUserData, AdminCreateProduct } from './components';
import { getProducts, loginUser, registerUser, getSingleProduct, getUserCart, addToUserCart, getAllUsers, createProduct} from "./api"


const getCart = async (setCart, token) => { // I think it should work now, let me know if you still have errors -Elpidio
  
  const localCart = window.localStorage.cart || '[]'

  console.log(localCart)

  const storedCart = JSON.parse(localCart)
  // console.log(storedCart)
  // console.log(storedCart.length)
  let userCart = []
  // console.log(token)
  if(token && token !== 'null' && token !== 'undefined' && token !== null) {
    const dbCart = await getUserCart(token)
    console.log(dbCart)
    userCart = dbCart
  }
  // console.log(storedCart.length)
  if(token === "null" || token === 'undefined' || token === null) {
    if(storedCart.length !== 0) {
      setCart(storedCart)
      return
    }
    // console.log(storedCart.length)
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
  const location = useLocation();

  const fetchProducts = async () => {
    const results = await getProducts()

    setProducts(results)
  }

  useEffect(() => {
    getCart(setCart, token)
  }, [setCart, token])

  useEffect(() => {
    fetchProducts();
  }, [location.pathname, products])

    return (
      <div>
          <Navbar cart={cart} setCart={setCart} products={products}/>
          <Routes>
              <Route path="/" element={<Home navigate={navigate} />} />
              <Route path="/shop" element={<Shop products={products} cart={cart} setCart={setCart} AddToCartButton={AddToCartButton} />} />
              <Route path="/login" element={<Login loginUser={loginUser} navigate={navigate} setCart={setCart} setToken={setToken} />} />
              <Route path="/register" element={<Register registerUser={registerUser} navigate={navigate} />} />
              <Route path="/admin" element={<Admin navigate={navigate} />} />
              <Route path="/admin/userdata" element={<AdminUserData navigate={navigate} getAllUsers={getAllUsers} />} />
              <Route path="/admin/createproduct" element={<AdminCreateProduct navigate={navigate} createProduct={createProduct} fetchProducts={fetchProducts} getProducts={getProducts} setProducts={setProducts} />} />
              <Route path="/products/:productId" element={<SingleProduct getSingleProduct={getSingleProduct} navigate={navigate} cart={cart} setCart={setCart} AddToCartButton={AddToCartButton} getProducts={getProducts} setProducts={setProducts} />} />
          </Routes>
          <Footer />
      </div>
    );
  }
  
  export default App;