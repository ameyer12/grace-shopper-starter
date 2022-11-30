import React from 'react';
import { useParams } from 'react-router-dom'

const SingleProductView = ({products}) => {
    const { productId } = useParams();
    const [currentProduct] = products.filter(product => product.id === productId * 1);
    


    return (
        
        <div id='product'>
            { currentProduct &&
           <div className="card" >
                            <img className="product-image" src={currentProduct.image} alt={currentProduct.description}/>
                            <p className='product-title'>
                                {currentProduct.title}
                                <br></br>
                                ${currentProduct.price}
                                <br></br>
                            </p>
                        </div>
            }
        </div>
    )
}

export default SingleProductView