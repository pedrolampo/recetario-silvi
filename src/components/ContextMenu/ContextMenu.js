import React from 'react';

import './contextMenu.css';

export default function ContextMenu({ active }) {
  return (
    <div className={active ? 'context-menu active' : 'context-menu'}>
      <div className="context-menu-btn">Modificar</div>
      <div className="context-menu-btn">Eliminar</div>
    </div>
  );
}
