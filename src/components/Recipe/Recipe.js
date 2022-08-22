import React from 'react';

import './recipe.css';

export default function Recipe({ recipe }) {
  if (recipe)
    return (
      <div className="recipe">
        <h1 className="recipe-title">{recipe.title}</h1>
        <h4>Ingredientes</h4>
        <ul className="recipe-ingredients-list">
          {recipe.ingredients.map((i) => (
            <li className="recipe-ingredient" key={i}>
              {i}
            </li>
          ))}
        </ul>
        <h4>Procedimiento</h4>
        <p className="recipe-process">{recipe.process}</p>
      </div>
    );
  else return <p className="loading">Cargando...</p>;
}
