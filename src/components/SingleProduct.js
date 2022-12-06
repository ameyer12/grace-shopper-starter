import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addToUserCart } from '../api';
import './singleproduct.css';
import 'bootstrap'

const SingleProduct= ({getSingleProduct, AddToCartButton, setCart, cart}) => {

    const [singleProduct, setSingleProduct] = useState({});

    const { productId } = useParams();

    const fetchSingleProduct = async () => {
        const results = await getSingleProduct(productId)
        setSingleProduct(results)
    }

    useEffect(() => {
        fetchSingleProduct()
    }, [])

    let id = null;
    let title = null;
    let description = null;
    let image = null;
    let price = null;
    let inventory = null;

    Object.values(singleProduct).map((currentItem) => {
        id = currentItem.id;
        title = currentItem.title;
        description = currentItem.description;
        image = currentItem.image;
        price = currentItem.price;
    
        if(currentItem.inventory === 0) {
            inventory = "No";
        } else {
            inventory = "Yes";
        }
    })

    return (
        <div className="single-product-body">
            <img className="single-product-image" src={image} alt="Product image"/>
            <div className="card" id="single-product-page-card">
                <h1 className="single-product-title">{title}</h1>
                <p className="single-product-price">${price}</p>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Select Size</label>
                        <select class="form-control" id="select-size-form">
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>
                        </select>
                {/* <button 
                type="submit"
                id="add-to-cart-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    console.log(id)
                    // handleRegister();
                }}
                >Add To Cart</button> */}
                        {<AddToCartButton setCart={setCart} cart={cart} itemId={id} />}  
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Product Details
                        </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>{description}</p>
                        </div>
                        </div>
                    </div>
                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Is this item in stock?
                        </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            {inventory}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
        </div>
    )
}
    

export default SingleProduct;