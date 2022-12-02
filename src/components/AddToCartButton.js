import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

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
        if(cart.length === 0) {
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
            <span className='qtyButtons'>{ quantity > 1 
                    ? <Button variant="text" id="qtyBtn" onClick={() => setQuantity(quantity - 1)}><i className="material-icons">remove</i></Button>
                    : <Button variant="text" id="qtyBtn"><i className="material-icons">remove</i></Button>} {quantity} <Button variant="text" id="qtyBtn" onClick={() => {setQuantity(quantity + 1)}}><i className="material-icons">add</i></Button></span>
            <Button variant="outlined" className="addToCartBtn" onClick={() => addToCart()}>Add To Cart</Button>
        </>
    )
}

export default AddToCartButton