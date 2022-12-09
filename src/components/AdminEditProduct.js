import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { updateProduct } from '../api'
import './admineditproduct.css';


const AdminEditProduct = ({navigate, products, setProducts, getProducts}) => {

    const { productId } = useParams();

    let id = null;
    let title = null;
    let description = null;
    let price = null;
    // let categories = null;
    let inventory = null;
    let image = null; 

    Object.values(products.map((currentItem) => {
        if(currentItem.id == productId) {
            id = currentItem.id;
            title = currentItem.title;
            description = currentItem.description;
            price = currentItem.price;
            inventory = currentItem.inventory;
            image = currentItem.image;
        }
    }))

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    // const [newCategories, setNewCategories] = useState(categories);
    const [newInventory, setNewInventory] = useState(inventory);
    const [newImage, setNewImage] = useState(image);

    const token = window.localStorage.token

    const handleEditProduct = async () => {

        try {
            const updatedProduct = {
                id: id,
                title: newTitle,
                description: newDescription,
                price: newPrice,
                inventory: newInventory,
                image: newImage
            };
            console.log(updatedProduct)

            await updateProduct(updatedProduct)

            const refreshProducts = await getProducts();

            setProducts(refreshProducts) 

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    return(
        <div className='edit-product'>
            <button
                type="submit"
                id="return-to-admin-page" 
                className="btn btn-primary"
                onClick={() => {
                    navigate("/admin")
                }}
            >Return to Admin Dashboard</button>
            <form className="card" id="edit-product-form">
                <div className="form-group">
                <h1 className='register-h1'>Edit Product</h1>
                <label for="exampleInputEmail1">Title</label>
                <input 
                type="username" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Title"
                onChange={(ev) => {
                    ev.preventDefault();
                    setNewTitle(ev.target.value)
                }}
                />
                </div>
                <div id="edit-product-id" className="form-group">
                <label for="exampleInputPassword1">Description</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Description"
                onChange={(ev) => {
                    ev.preventDefault();
                    setNewDescription(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Price</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Price"
                onChange={(ev) => {
                    ev.preventDefault();
                    setNewPrice(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Categories</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Categories"
                onChange={(ev) => {
                    ev.preventDefault();
                    console.log(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Inventory</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Inventory"
                onChange={(ev) => {
                    ev.preventDefault();
                    setNewInventory(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Image URL</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Image URL"
                onChange={(ev) => {
                    ev.preventDefault();
                    setNewImage(ev.target.value)
                }}
                />
                <button 
                type="submit"
                id="edit-product-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    handleEditProduct();
                    navigate("/shop");
                }}
                >Edit Product</button>
                </div>
            </form>
        </div>
    )
}

export default AdminEditProduct;