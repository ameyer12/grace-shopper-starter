import React, {useEffect, useState} from 'react';
import { addToUserCart } from '../api';

const AddToCartButton = ({cart, setCart, itemId}) => {
    const [quantity, setQuantity] = useState(1)
    const token = window.localStorage.getItem('token')

    const addDbCart = async () => {
        await addToUserCart(token, itemObject)
    }

    function itemInCart(itemId) {
        const item = cart.find((item) => item.itemId === itemId)
        
        if(item === undefined) {
            return false
        } else return true
    }

    function addToCart() {
        if(itemInCart(itemId)) {
            return
        }
        if(token !== 'null') {
            addDbCart()
        }
        if(cart.length === 0) {
            setCart([itemObject])
            window.localStorage.setItem('cart', JSON.stringify([itemObject]))
            return
        }
        window.localStorage.setItem('cart', JSON.stringify([...cart, itemObject]))
        setCart([...cart, itemObject])
    }

    const itemObject = {
        itemId,
        qty: quantity
    }
    return (
        <>
            <span>{ quantity > 1 
                    ? <button onClick={() => setQuantity(quantity - 1)}>-</button>
                    : <button>-</button>} quantity: {quantity}<button onClick={() => {setQuantity(quantity + 1)}}>+</button></span>
            <button onClick={() => addToCart()}>Add To Cart</button>
        </>
    )
}

export default AddToCartButton