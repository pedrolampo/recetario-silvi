import React, { useState } from 'react';

export const NotificationContext = React.createContext();

export const NotificationContextProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [style, setStyle] = useState('');
  const [recipeId, setRecipeId] = useState('');

  const setNotification = (style, severity, message, recipeId) => {
    setStyle(style);
    setMessage(message);
    setSeverity(severity);
    setRecipeId(recipeId);

    if (style === 'confirm') return;
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const value = {
    notification: {
      message,
      severity,
    },
    style,
    recipeId,
    setMessage,
    setNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
