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
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

export const app = initializeApp(firebaseConfig);

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

export const getPass = () => {
  return new Promise((res, rej) => {
    getDoc(doc(db, 'data', process.env.REACT_APP_passId))
      .then((querySnapshot) => {
        res(querySnapshot.data().pass);
      })
      .catch((err) => {
        rej(`error al obtener los datos: ${err}`);
      });
  });
};

export const pushRecipe = () => {
  setDoc(doc(db, 'recipes', { title: 'Torta Negra', category: 'dulce' }));
};
