import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        navigate('/sign-in')
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>SIGNUP</h1>
        <form >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button  onClick={submit} className="register-button">Signup</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/sign-in">Login</Link>
        </p>
      </div>
    </div>
    
  );
};

export default Signup;
