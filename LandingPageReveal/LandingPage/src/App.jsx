import React from 'react';
import './App.css';


const App = () => {
  return (
    <>
        <div className="preloader-counter">
            <h1>0</h1>
        </div>
        <nav>
            <div className="nav-logo">
                <a href='#'>Canon</a>
            </div>
            <div className="nav-links">
                <a href='#'>Index</a>
                <a href='#'>Collection</a>
                <a href='#'>Material</a>
                <a href='#'>Process</a>
                <a href='#'>Info</a>
            </div>
        </nav>
        <section className="hero">
            <div className="hero-bg">
                <img src='/hero.jpg' alt='bg img' />
            </div>
            <div className="header">
                <h1>Canon</h1>
            </div>
            <div className="hero-footer">
                <p>Performance</p>
                <p>Craftmanship</p>
                <p>Expression</p>
            </div>

            <div className="progress-bar">
                <div className="progress"></div>
            </div>
        </section>
    </>
  )
}

export default App
