import React from 'react';
import { Link } from 'react-router-dom';

import './main.css';

export default function Main() {
  return (
    <div className="main-screen">
      <Link to="/category/dulce">
        <div className="main-card dulce">
          <div className="main-overlay">
            <h3>Dulce</h3>
          </div>
        </div>
      </Link>

      <Link to="/category/salado">
        <div className="main-card">
          <div className="main-overlay">
            <h3>Salado</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
