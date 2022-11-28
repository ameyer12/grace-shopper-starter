import './style.css';
import React from 'react';
// import { Link } from 'react-router-dom';
import './navbar.css'


const Navbar = ({ logout, token }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{background: "white"}}>
      <a className="navbar-brand" href="/">The Closet</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li id="home-link" className="nav-item active">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li id="shop-link" className="nav-item">
            <a className="nav-link" href="/shop">Shop</a>
          </li>
          <li id="blog-link" className="nav-item">
            <a className="nav-link" href="#">Blog</a>
          </li>
          <li className="nav-item">
            <a id="about-link" className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a id="profile-link" className="nav-link" href="/login"><i className="material-icons">person</i></a>
          </li>
          <li className="nav-item">
            <a id="cart-link"className="nav-link" href="#"><i className="material-icons">shopping_cart</i></a>
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
// }

// return (
//   <header>
//     <nav className="navbar">
//       <Link className="link" to='/'>Home</Link>
//       <Link className="link" to='/orderItems'>Shop</Link>
//       <Link className="link" to='/reviews'>Blog</Link>
//       <Link className="link" to='/products'>About</Link>


// {
// token ?(
// <>
// <Link className="link" to='/' 
//         onClick={ () => {
//           logout()
//       }}>Logout</Link>
// </>
    
// ): (<>
// <Link className="link" to='/register'>Register</Link>
// <Link className="link" to='/login'>Login</Link>

// </>
// )
// }
//     </nav>
   
//   </header>
// )
}

export default Navbar;