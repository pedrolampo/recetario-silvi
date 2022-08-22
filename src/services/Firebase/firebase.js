import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAilxeWaKCuC1uWx1RQGEo386sPkSq9MVo',
  authDomain: 'recetario-silvi.firebaseapp.com',
  projectId: 'recetario-silvi',
  storageBucket: 'recetario-silvi.appspot.com',
  messagingSenderId: '1004000079429',
  appId: '1:1004000079429:web:d115c0ee592332d634fd2c',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const getRecipes = (key, op, value) => {
  return new Promise((res, rej) => {
    const collectionQuery =
      key && op && value
        ? query(collection(db, 'recipes'), where('category', '==', value))
        : collection(db, 'recipes');

    getDocs(collectionQuery)
      .then((querySnapshot) => {
        const recipes = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res(recipes);
      })
      .catch((err) => {
        rej(`Error al obtener las recetas: ${err}`);
      });
  });
};

export const searchRecipes = (key, op, value) => {
  return new Promise((res, rej) => {
    const collectionQuery =
      key && op && value
        ? query(
            collection(db, 'recipes'),
            where('title', '>=', value),
            where('title', '<=', value)
          )
        : collection(db, 'recipes');

    getDocs(collectionQuery)
      .then((querySnapshot) => {
        const recipes = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res(recipes);
      })
      .catch((err) => {
        rej(`Error al obtener las recetas: ${err}`);
      });
  });
};

export const getSingleRecipe = (value) => {
  return new Promise((res, rej) => {
    getDoc(doc(db, 'recipes', value))
      .then((querySnapshot) => {
        const product = {
          id: querySnapshot.id,
          ...querySnapshot.data(),
        };
        res(product);
      })
      .catch((err) => {
        rej(`Error al obtener el producto: ${err}`);
      });
  });
};

export const pushRecipe = () => {
  setDoc(doc(db, 'recipes', { title: 'Torta Negra', category: 'dulce' }));
};
