import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'


const Navbar = ({ logout, token }) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light" style={{background: "white"}}>
      <a class="navbar-brand" href="#">Company Name</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li id="home-link" class="nav-item active">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li id="shop-link" class="nav-item">
            <a class="nav-link" href="#">Shop</a>
          </li>
          <li id="blog-link" class="nav-item">
            <a class="nav-link" href="#">Blog</a>
          </li>
          <li class="nav-item">
            <a id="about-link" class="nav-link" href="#">About</a>
          </li>
          <li class="nav-item">
            <a id="profile-link" class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a id="cart-link"class="nav-link" href="#">Cart</a>
          </li>
        </ul>
      </div>
    </nav>
  )

//We can use this as a reference when adding more functionality to the navbar

//     <header>
//       <nav className="navbar">
//         <Link className="link" to='/'>Home</Link>
//         {/* <Link className="link" to='/OtherTab'>OtherTab</Link> */}

// {
// token ?( // needs login to access
//   <>
// <Link className="link" to='/' 
//           onClick={ () => {
//             logout()
//         }}>Logout</Link>
        
// {/* <Link className="link" to='/OtherTab'>OtherTab</Link> */}
// </>
      
// ): (<>
//   <Link className="link" to='/register'>Register</Link>
//   <Link className="link" to='/login'>Login</Link>

//   </>
// )
// }
//       </nav>
     
//     </header>
//   )
}

export default Navbar;