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
      navigate('/home'); // Navigate to the home page upon successful login
    } else {
      alert('Incorrect username or password!');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        {/* Image tag to display the logo */}
        <img src={logo} alt="Logo" className="logo" />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
