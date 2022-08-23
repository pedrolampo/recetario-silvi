import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './categories.css';

export default function Categories() {
  const [dulce, setDulce] = useState(false);
  const [salado, setSalado] = useState(false);

  const location = useLocation().pathname;

  useEffect(() => {
    if (location.includes('dulce')) {
      setDulce(true);
      setSalado(false);
      return;
    } else if (location.includes('salado')) {
      setSalado(true);
      setDulce(false);
      return;
    }
    setDulce(false);
    setSalado(false);
  }, [location]);

  return (
    <div className="categories-container">
      <ul className="categories-list">
        <li className={dulce ? 'category active' : 'category'}>
          <Link to="/category/dulce">Dulce</Link>
        </li>
        <li className={salado ? 'category active' : 'category'}>
          <Link to="/category/salado">Salado</Link>
        </li>
      </ul>
    </div>
  );
}
