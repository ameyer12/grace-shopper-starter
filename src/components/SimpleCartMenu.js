import React, {useEffect, useState} from 'react';


const SimpleCartMenu = ({setShowCart, showCart, cart, products, setCart}) => {
    const [reload, setReload] = useState(false)

    function fetchProduct(id) {
        console.log(products)
        const currentProduct = products.find((product) => product.id === id)
        return currentProduct
    }
    function editCart(qty, idx) {
        cart[idx].qty = qty
        setCart(cart)
        setReload(!reload)
        console.log(cart) 
    }
    function removeFromCart(productId) {
        const newCart = cart.filter((item) => item.itemId !== productId)
        setCart(newCart)
        setReload(!reload)
    }
    return (
        <>
          <li className="nav-item">
            <button style={{border: 'none'}} id="cart-link"className="nav-link" onClick={() => setShowCart(!showCart)}><i className="material-icons">shopping_cart</i></button>
          </li>
        <div className='cartMenu'>
        <ul>
            {cart[0] ? ( cart.map((item, idx) => {
                const currentProduct = fetchProduct(item.itemId)
                console.log(currentProduct)
                return ( <li key={item.qty}>
                    <p>{currentProduct.title}</p>
                    <p>quantity: {item.qty}</p>
                    { item.qty > 1 
                    ? <button onClick={() => editCart(item.qty - 1, idx)}>-</button>
                    : <button onClick={() => removeFromCart(item.itemId)}>remove item</button>}
                    <button onClick={() => editCart(item.qty + 1, idx)}>+</button>
                    
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