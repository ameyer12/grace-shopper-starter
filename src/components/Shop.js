import React, {useState} from 'react';
import './shop.css';

const Shop = ({products, setCart, cart, AddToCartButton, deleteProduct}) => {

    const [productId, setProductId] = useState("");

    const handleDeleteProduct = async () => {
        const results = await deleteProduct(productId)
        console.log(results)
    }

    if(window.localStorage.isAdmin != "true") {
        return (
            <div className="shop">
            <h1 className='shop-page-h1'>Shop All</h1>
            <div className='products-container'> {
                products.map((currentItem, index) => { 
                    return <li className="card" key={index}>
                                <img className="product-image" src={currentItem.image} alt={currentItem.description}/>
                                <p className='product-title'>
                                    {currentItem.title}
                                    <br></br>
                                    ${currentItem.price}
                                    <br></br>
                                    <a className="product-link" href={`/products/${currentItem.id}`}>View Item</a>
                                </p>
                            </li>
                })}
            </div>
            <div className='spacing-div'></div>
        </div>
        )
    } else if(window.localStorage.isAdmin == "true"){
        return (
            <div className="shop">
            <h1 className='shop-page-h1'>Shop All</h1>
            <div className='products-container'> {
                products.map((currentItem, index) => { 
                    return <li className="card" key={index}>
                                <img className="product-image" src={currentItem.image} alt={currentItem.description}/>
                                <p className='product-title'>
                                    {currentItem.title}
                                    <br></br>
                                    ${currentItem.price}
                                    <br></br>
                                    <a className="product-link" href={`/products/${currentItem.id}`}>View Item</a>
                                    <a 
                                    className="delete-button"
                                    onClick={() => {
                                        setProductId(currentItem.id);
                                        console.log(productId)
                                        handleDeleteProduct();
                                    }}
                                    >Delete Item</a>
                                </p>
                            </li>
                })}
            </div>
            <div className='spacing-div'></div>
        </div>
        )
    }
}

export default Shop;