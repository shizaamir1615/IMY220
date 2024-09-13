import React from 'react';
import { Link } from 'react-router-dom';


const Splash = () => {
    return (
        <div className="home-page">
            <div className="content-wrapper">
                <div className="left-content">
                    <img src="/assets/images/logoBlack.png" alt="Opula Logo" className="logo" />
                    <h1 className="title">
                        Music sounds better together, share it!
                    </h1>
                    <div className="button-group">
                        <button className="btn btn-primary">
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Log in</Link>
                        </button>
                        <button className="btn btn-secondary">
                            <Link to="/signup" style={{ color: 'black', textDecoration: 'none' }}>Sign up</Link>
                        </button>
                    </div>
                </div>
                <div className="right-content">
                    <img src="/assets/images/girl.png" alt="Girl with headphones" className="girl-image" />
                </div>
            </div>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;700&display=swap');

        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: 'Urbanist', sans-serif;
        }
        #__next {
          height: 100%;
        }
      `}</style>
            <style jsx>{`
        .home-page {
          min-height: 100vh;
          width: 100vw;
          background-image: url('/assets/images/background.png');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .content-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .left-content {
          width: 100%;
          text-align: left;
          margin-bottom: 30px;
          padding-left: 20px;
        }
        .logo {
          width: 230px;
          margin-bottom: 20px;
          margin-left: auto;
          display: block;
        }
        .title {
          font-size: 70px;
          font-weight: bold;
          margin-bottom: 30px;
          color: white;
        }
        .button-group {
          display: flex;
          justify-content: flex-start;
          gap: 20px;
        }
        .btn {
          padding: 13px 60px; /* Increase padding to make the buttons wider */
          border: none;
          border-radius: 25px;
          font-size: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .btn:hover {
          opacity: 0.9;
        }
        .btn-primary {
          background-color: #F177DF; /* Apply the specified pink color */
          color: white;
        }
        .btn-secondary {
          background-color: white;
          color: black;
        }
        .right-content {
          position: absolute;
          right: -50px;
          top: 55%;
          transform: translateY(-50%);
          width: 1000px;
          height: 850px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .girl-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        @media (min-width: 768px) {
          .content-wrapper {
            flex-direction: row;
            align-items: center;
          }
          .left-content {
            width: 50%;
            margin-bottom: 0;
            padding-left: 5px;
          }
          .title {
            font-size: 38px;
          }
          .logo {
            width: 220px;
            margin-left: auto;
            margin-right: 40%;
          }
          .button-group {
            margin-top: 70px;
            margin-left: 10px;
            justify-content: flex-start;
          }
          .right-content {
            right: -40px;
          }
        }
        @media (min-width: 1200px) {
          .right-content {
            right: -185px;
          }
        }
        .title {
        font-size: 38px;
        font-weight: bold;
        margin-bottom: 30px;
        color: white;
        }

        @media (min-width: 768px) {
        .title {
            font-size: 77px;
        }
        }
      `}</style>
        </div>
    );
};

export default Splash;
