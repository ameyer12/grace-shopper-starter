import React from 'react';
import './home.css';

const Home = ({navigate}) => {
    return (
        <div className="home" >
            <div className="home-page-h1-container">
                <h1 className="home-page-h1">Welcome to The Closet</h1>
                <p className="home-page-p">
                    The Closet was founded in 2022. We aim to deliver simple and timeless styles that empower people to look good and feel good. 
                </p>
                <button 
                type="button" 
                class="btn"
                onClick={() => {
                    navigate("/shop")
                }}
                >Browse our styles</button>
            </div>
            <div className="home-page-image-container">  
                <img className='home-page-image' src="https://i.postimg.cc/k4tK5Jvr/pexels-renato-bezerra-4225393.jpg" alt="Hanging shoes" />
            </div>
        </div>
    )
}

export default Home;