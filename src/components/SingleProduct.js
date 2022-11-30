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
            <h1 className="single-product-title">{title}</h1>
            <p className="single-product-price">${price}</p>
            <p className="single-product-description">{description}</p>
        </div>
    )
}
    

export default SingleProduct;