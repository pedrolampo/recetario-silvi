import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';

import { db } from '../../services/Firebase/firebase';

import { NotificationContext } from '../../context/NotificationContext';

import './notification.css';

const Notification = () => {
  const { notification, setNotification, style, setMessage, recipeId } =
    useContext(NotificationContext);
  const navigate = useNavigate();

  if (notification.message === '') {
    return null;
  }

  const deleteRecipe = async () => {
    await deleteDoc(doc(db, 'recipes', recipeId));

    navigate('/');

    setNotification('', 'success', 'Receta Eliminada', '');
  };

  if (style === 'confirm') {
    return (
      <div className="notif-overlay">
        <div className="confirm-notif">
          <h4>{notification.message}</h4>

          <div className="notif-btn-container">
            <button className="notif-btn" onClick={() => setMessage('')}>
              No
            </button>

            <button className="notif-btn" onClick={deleteRecipe}>
              Sí
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={style + 'notification'}
      style={{
        color: notification.severity === 'error' ? 'red' : 'black',
      }}
      onClick={() => setMessage('')}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
