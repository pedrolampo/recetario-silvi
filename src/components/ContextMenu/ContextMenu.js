import React from 'react';
import { Link } from 'react-router-dom';

import './contextMenu.css';

export default function ContextMenu({ active, recipeId }) {
  return (
    <div className={active ? 'context-menu active' : 'context-menu'}>
      <Link to={`/updateRecipe/${recipeId}`}>
        <div className="context-menu-btn">Modificar</div>
      </Link>
      <div className="context-menu-btn">Eliminar</div>
    </div>
  );
}
