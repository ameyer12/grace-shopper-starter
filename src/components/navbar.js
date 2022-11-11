import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';


const navbar = ({ logout, token }) => {
  return (
    <header>
      <nav className="navbar">
        <Link className="link" to='/'>Home</Link>
        {/* <Link className="link" to='/OtherTab'>OtherTab</Link> */}

{
token ?( // needs login to access
  <>
<Link className="link" to='/' 
          onClick={ () => {
            logout()
        }}>Logout</Link>
        
{/* <Link className="link" to='/OtherTab'>OtherTab</Link> */}
</>
      
): (<>
  <Link className="link" to='/register'>Register</Link>
  <Link className="link" to='/login'>Login</Link>

  </>
)
}
      </nav>
     
    </header>
  )
}

export default Navbar;