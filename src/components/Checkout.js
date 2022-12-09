import React, {useEffect, useState} from 'react';
import './checkout.css';
import { fetchProduct } from './SimpleCartMenu';

const Checkout = ({navigate, cart, products}) => {
    function fetchProduct(id) {
        const currentProduct = products.find((product) => product.id === id)
        return currentProduct
    }
    return (
        <div className="checkout" >
            <div className="checkout-page-h1-container">
                <h1 className="home-page-h1">Currently at checkout!</h1>
                <p className="checkout-page-p">
                    Here are your items: 
                </p>      
                <p>
                {/* <ul>
            {(cart.length !== 0 && products.length !== 0) ? ( cart.map((item, idx) => {
                const currentProduct = fetchProduct(item.itemId)
              
                return ( <li key={idx}>
                    <p>{currentProduct.title}</p>
                    <p>quantity: {item.qty}</p>                
                </li> )
            }) )
            : <h1>No items!</h1>
        }
                </ul>*/}
                </p>
                <p>  
                    <button type="button" id="checkout-page-button" className="btn" 
                    onClick={() => {navigate("/complete")}}> Checkout</button>
                </p>
            </div>  
            
            <li className="nav-item">
          </li>
       
        </div>
                
    )
}

export default Checkout;