import './style.css';
import React, { useState } from 'react';
import logoImage from "./The.jpg";
import './navbar.css'
import SimpleCartMenu from './SimpleCartMenu';


const Navbar = ({ logout, token, cart, setCart, products }) => {
  const [showCart, setShowCart] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{background: "white"}}>
      <a className="navbar-brand" href="/"><img id="brand-logo" src={logoImage} alt="The Closet Logo" width="100rem" height="100rem"/></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li id="home-link" className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li id="shop-link" className="nav-item">
            <a className="nav-link" href="/shop">Shop</a>
          </li>
          <li id="blog-link" className="nav-item">
            <a className="nav-link" href="#">Blog</a>
          </li>
          <li className="nav-item">
            <a id="about-link" className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a id="profile-link" className="nav-link" href="/login"><i className="material-icons">person</i></a>
          </li>
          {!showCart ?

          <li className="nav-item">
            <button style={{border: 'none', backgroundColor: 'white'}} id="cart-link"className="nav-link" onClick={() => setShowCart(!showCart)}><i className="material-icons">shopping_cart</i></button>
          </li> : <SimpleCartMenu setShowCart={setShowCart} showCart={showCart} cart={cart} products={products} setCart={setCart}/>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;