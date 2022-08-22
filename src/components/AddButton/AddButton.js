import React from 'react';

import './addButton.css';

export default function AddButton({ showAddModal }) {
  return (
    <button
      className="add-btn"
      onClick={() => {
        showAddModal(true);
      }}
    >
      Agregar
    </button>
  );
}
