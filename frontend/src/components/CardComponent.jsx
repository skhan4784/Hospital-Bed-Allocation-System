// CardComponent.jsx
import React from 'react';
import './CardComponent.css';

const CardComponent = ({ title, onClick, isActive }) => {
  return (
    <div className={`card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default CardComponent;
