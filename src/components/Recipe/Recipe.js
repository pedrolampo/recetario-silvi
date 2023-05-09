import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import ContextMenu from '../ContextMenu/ContextMenu';

import './recipe.css';

export default function Recipe({ recipe }) {
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const { recipeId } = useParams();

  if (recipe)
    return (
      <div className="recipe">
        <div className="recipe-header">
          <img className="recipe-image" src={recipe.image} alt="Recipe" />
          <h1 className="recipe-title">{recipe.title}</h1>
        </div>

        <h4 className="recipe-subtitle">Ingredientes</h4>
        <ul className="recipe-ingredients-list">
          {recipe.ingredients.map((i) => (
            <li className="recipe-ingredient" key={i}>
              {i}
            </li>
          ))}
        </ul>

        <h4 className="recipe-subtitle">Procedimiento</h4>
        <p className="recipe-process">{recipe.process}</p>

        <div
          className="open-context-menu-btn"
          onClick={() => setContextMenuOpen(!contextMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </div>
        <ContextMenu active={contextMenuOpen} recipeId={recipeId} />
      </div>
    );
  else return <p className="loading">Cargando...</p>;
}
