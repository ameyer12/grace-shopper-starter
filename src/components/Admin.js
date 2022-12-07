import React from 'react';
import './admin.css';

const Admin = ({navigate}) => {
    return(
        <div className='admin'>
            <button 
                id="admin-page-button" 
                className="btn btn-primary"
                onClick={() => {
                   navigate("/admin/userData")
                }}
            >View User Information</button>
            <button 
                type="submit"
                id="admin-page-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    // handleRegister();
                }}
            >Create Product</button>
            <button 
                type="submit"
                id="admin-page-button" 
                className="btn btn-primary"
                onClick={(ev) => {
                    ev.preventDefault();
                    // handleRegister();
                }}
            >Edit Product</button>
        </div>
    )
}

export default Admin;
