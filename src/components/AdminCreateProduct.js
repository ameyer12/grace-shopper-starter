import React, {useState, useEffect} from 'react';
import './admincreateproduct.css';

const AdminCreateProduct = ({navigate, createProduct, setProducts, getProducts}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(Number);
    const [categories, setCategories] = useState(Number);
    const [inventory, setInventory] = useState("");
    const [image, setImage] = useState("");

    const handleCreateProduct = async () => {

        const results = await createProduct(title, description, price, categories, inventory, image)

        const refreshProducts = await getProducts();

        setProducts(refreshProducts) 
    }

    return(
        <div className='create-post'>
            <button
                type="submit"
                id="return-to-admin-page" 
                className="btn btn-primary"
                onClick={() => {
                    navigate("/admin")
                }}
            >Return to Admin Dashboard</button>
            <form className="card" id="create-post-form">
                <div className="form-group">
                <h1 className='register-h1'>Create Product</h1>
                <label for="exampleInputEmail1">Title</label>
                <input 
                type="username" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Title"
                onChange={(ev) => {
                    ev.preventDefault();
                    setTitle(ev.target.value)
                }}
                />
                </div>
                <div id="create-post-id" className="form-group">
                <label for="exampleInputPassword1">Description</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Description"
                onChange={(ev) => {
                    ev.preventDefault();
                    setDescription(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Price</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Price"
                onChange={(ev) => {
                    ev.preventDefault();
                    setPrice(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Categories</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Categories"
                onChange={(ev) => {
                    ev.preventDefault();
                    setCategories(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Inventory</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Inventory"
                onChange={(ev) => {
                    ev.preventDefault();
                    setInventory(ev.target.value)
                }}
                />
                <label for="exampleInputPassword1">Image URL</label>
                <input 
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder="Image URL"
                onChange={(ev) => {
                    ev.preventDefault();
                    setImage(ev.target.value)
                }}
                />
                <button 
                type="submit"
                id="create-post-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    handleCreateProduct();
                    navigate("/shop");
                }}
                >Create Product</button>
                </div>
            </form>
        </div>
    )
}

export default AdminCreateProduct;