// export default RegisterPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Registration form is valid. Proceeding with registration...');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="logo-container">
          <img src="/assets/images/logoWhite.png" alt="Opula Logo" className="logo" />
        </div>
        <h1 className="welcome-text">Get started</h1>
        <p className="subtext">Please enter your details</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username for your profile"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <button type="submit" className="register-button">Sign up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
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
        .register-page {
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

        .register-container {
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
          height: 750px;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 5px;
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
          margin-bottom: 10px;
          font-weight: 1000;
        }

        .register-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          font-weight: 550;
          font-size: 24px;
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
        }

        input:focus {
          border-bottom-color: #F177DF;
        }

        .register-button {
          background-color: #F177DF;
          color: white;
          padding: 10px 50px;
          border: none;
          border-radius: 25px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
          margin: 15px auto 0 auto;
          display: block;
          max-width: 300px;
        }

        .register-button:hover {
          background-color: #E050C0;
        }

        .login-link {
          margin-top: 20px;
          text-align: center;
          color: #666;
        }

        .login-link a {
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

export default RegisterPage;