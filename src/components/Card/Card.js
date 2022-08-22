import React from 'react';
import { Link } from 'react-router-dom';

import './card.css';

export default function Card({ items }) {
  return (
    <div className="cards-container">
      {items.map((i) => (
        <Link key={i.title} className="card" to={`/recipe/${i.id}`}>
          <h1 className="card-title">{i.title}</h1>
        </Link>
      ))}
    </div>
  );
}
