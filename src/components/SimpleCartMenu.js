import React, {useState} from 'react';

const SimpleCartMenu = ({setShowCart, showCart, cart}) => {

    return (
        <>
          <li className="nav-item">
            <button style={{border: 'none'}} id="cart-link"className="nav-link" onClick={() => setShowCart(!showCart)}><i className="material-icons">shopping_cart</i></button>
          </li>
        <div className='cartMenu'>
        <ul>
            {cart[0].itemId ? cart.map((cart) => {
                return <li>
                    
                </li>
            })
            : <h1>no items</h1>
        }
        </ul>
        </div>
        </>
    )
}

export default SimpleCartMenu