import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { NotificationContext } from '../../context/NotificationContext';

import './contextMenu.css';

export default function ContextMenu({ active, recipeId }) {
  const { setNotification } = useContext(NotificationContext);

  return (
    <div className={active ? 'context-menu active' : 'context-menu'}>
      <Link className="context-menu-btn" to={`/updateRecipe/${recipeId}`}>
        Modificar
      </Link>
      <div
        className="context-menu-btn"
        onClick={() =>
          setNotification(
            'confirm',
            '',
            '¿Seguro que quieres eliminarla?',
            recipeId
          )
        }
      >
        Eliminar
      </div>
    </div>
  );
}
