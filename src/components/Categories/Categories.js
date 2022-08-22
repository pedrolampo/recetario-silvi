import React from 'react';
import { Link } from 'react-router-dom';

import './categories.css';

export default function Categories() {
  return (
    <div className="categories-container">
      <ul className="categories-list">
        <li className="category">
          <Link to="/category/dulce">Dulce</Link>
        </li>
        <li className="category">
          <Link to="/category/salado">Salado</Link>
        </li>
      </ul>
    </div>
  );
}
