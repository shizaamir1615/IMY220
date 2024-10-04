import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:1337/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          console.log('Login successful:', data);
          navigate('/home'); // Redirect to Home page
        } else {
          setErrors({ ...errors, login: data.message || 'Login failed' });
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrors({ ...errors, login: 'An error occurred. Please try again later.' });
      }
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <img src="/assets/images/logoWhite.png" alt="Opula Logo" className="logo" />
        </div>
        <h1 className="welcome-text">Welcome back</h1>
        <p className="subtext">Please enter your details</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <p className="register-link">
        {errors.login && <span className="error">{errors.login}</span>}
          Don't have an account yet? <Link to="/signup">Register here</Link>
        </p>
      </div>
      <div className="image-container">
        <img src="/assets/images/girl.png" alt="Girl with headphones" className="girl-image" />
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
        .login-page {
          height: 100vh;
          width: 100vw;
          background-image: url('/assets/images/background.png');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          position: relative;
          overflow: hidden;
        }
        .login-container {
          flex: 1;
          max-width: 500px;
          padding: 30px;
          background-color: white;
          border-top-right-radius: 70px;
          border-bottom-right-radius: 70px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 1;
          height: 780px;
          margin-top: 0;
          padding-top: 0;
        }
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        .logo {
          width: 200px;
        }
        .welcome-text {
          font-size: 35px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 5px;
          color: #333;
          font-weight: 900;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }
        .subtext {
          text-align: center;
          color: #666;
          margin-bottom: 50px;
          font-weight: 1000;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          font-weight: 550;
          font-size: 25px;
          color: #333;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding-top: 25px;
          padding-bottom: 15px;
          border: none;
          border-bottom: 1px solid #ddd;
          font-family: 'Urbanist', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s;
          margin-left: 0;
        }
        input:focus {
          border-bottom-color: #F177DF;
        }
        .login-button {
          background-color: #F177DF;
          color: white;
          padding: 10px 50px;
          border: none;
          border-radius: 25px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
          margin: 45px auto 0 auto;
          display: block;
          max-width: 300px;
        }
        .login-button:hover {
          background-color: #E050C0;
        }
        .register-link {
          margin-top: 20px;
          text-align: center;
          color: #666;
        }
        .register-link a {
          color: #F177DF;
          text-decoration: none;
          font-weight: 600;
        }
        .image-container {
          position: absolute;
          right: -150px;
          top: 50%;
          transform: translateY(-50%);
          width: 950px;
          height: 800px;
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
          .image-container {
            right: -120px;
          }
        }
        @media (min-width: 1200px) {
          .image-container {
            right: -100px;
          }
        }
        .error {
          color: #ff0000;
          font-size: 14px;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;