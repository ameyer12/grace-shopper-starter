import React, {useEffect, useState} from 'react';

const AddToCartButton = ({cart, setCart, itemId}) => {
    const [quantity, setQuantity] = useState(1)

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
        if(!cart[0]) {
            setCart([itemObject])
            window.localStorage.setItem('cart', JSON.stringify([itemObject]))
            return
        }
        setCart([...cart, itemObject])
        window.localStorage.setItem('cart', JSON.stringify([...cart, itemObject]))
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