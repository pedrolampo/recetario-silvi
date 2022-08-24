import React from 'react';
import { Link } from 'react-router-dom';

import './contextMenu.css';

export default function ContextMenu({ active, recipeId }) {
  return (
    <div className={active ? 'context-menu active' : 'context-menu'}>
      <Link className="context-menu-btn" to={`/updateRecipe/${recipeId}`}>
        Modificar
      </Link>
      <div className="context-menu-btn">Eliminar</div>
    </div>
  );
}
