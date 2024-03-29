// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../../assets/images/logo.jpeg';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('/home');
    } else {
      alert('Incorrect username or password!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <img src={logo} alt="Logo" className="logo" />

        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field"
          />
        </div>

        <button type="button" onClick={handleLogin} className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
