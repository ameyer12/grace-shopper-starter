import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3">
            <p id="company-name" className="col-md-4 mb-0 text-muted">&copy; 2022 The Closet, Inc</p>
            <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
            <li className="nav-item"><a href="/shop" className="nav-link px-2 text-muted">Shop</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Blog</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
            <li id="footer-link" className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
            </ul>
        </footer>
        </div>
    )
}

export default Footer;





