import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './singleproduct.css';

const SingleProduct= ({getSingleProduct}) => {

    const [singleProduct, setSingleProduct] = useState({});

    const { productId } = useParams();

    const fetchSingleProduct = async () => {
        const results = await getSingleProduct(productId)
        setSingleProduct(results)
    }

    useEffect(() => {
        fetchSingleProduct()
    }, [])

    let title = null;
    let description = null;
    let image = null;
    let price = null;

    Object.values(singleProduct).map((currentItem) => {
        title = currentItem[0].title;
        description = currentItem[0].description;
        image = currentItem[0].image;
        price = currentItem[0].price;
    })
    return (
        <div className="single-product-body">
            <img className="single-product-image" src={image} alt="Product image" width="500" height="600"/>
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
                </div>
                <button 
                type="submit"
                id="add-to-cart-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    // handleRegister();
                }}
                >Add To Cart</button>
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
                           in stock goes here
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    

export default SingleProduct;