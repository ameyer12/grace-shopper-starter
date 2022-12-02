import React, {useEffect, useState} from 'react';
import './SimpleCartMenu.css';
import Button from '@mui/material/Button';

const SimpleCartMenu = ({setShowCart, showCart, cart, products, setCart}) => {
    const [reload, setReload] = useState(false)

    function fetchProduct(id) {
        const currentProduct = products.find((product) => product.id === id)
        return currentProduct
    }
    function editCart(qty, idx) {
        cart[idx].qty = qty
        setCart(cart)
        window.localStorage.setItem('cart', JSON.stringify(cart))
        setReload(!reload)
    }
    function removeFromCart(productId) {
        const newCart = cart.filter((item) => item.itemId !== productId)
        setCart(newCart)
        window.localStorage.setItem('cart', JSON.stringify(newCart))
        setReload(!reload)
    }
    return (
        <>
          <li className="nav-item">
            <button style={{border: 'none'}} id="cart-link"className="nav-link" onClick={() => setShowCart(!showCart)}><i className="material-icons">shopping_cart</i></button>
          </li>
        <div className='cartMenu'>
        <ul>
            {(cart.length !== 0 && products.length !== 0) ? ( cart.map((item, idx) => {
                const currentProduct = fetchProduct(item.itemId)
              
                return ( <li key={idx}>
                    <p>{currentProduct.title}</p>
                    <p>quantity: {item.qty}</p>
                    { item.qty > 1 
                    ? <Button variant="text" id="qtyBtn" onClick={() => editCart(item.qty - 1, idx)}><i className="material-icons">remove</i></Button>
                    : <Button onClick={() => removeFromCart(item.itemId)}>remove item</Button>}
                    <Button variant="text" id="qtyBtn" onClick={() => editCart(item.qty + 1, idx)}><i className="material-icons">add</i></Button>
                    
                </li> )
            }) )
            : <h1>no items</h1>
        }
        </ul>
        </div>
        </>
    )
}

export default SimpleCartMenu