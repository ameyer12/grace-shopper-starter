import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3">
            <p id="company-name" class="col-md-4 mb-0 text-muted">&copy; 2022 Company, Inc</p>

            <ul class="nav col-md-4 justify-content-end">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Shop</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Blog</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
            <li id="footer-link" class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
            </ul>
        </footer>
        </div>
    )
}

export default Footer;





