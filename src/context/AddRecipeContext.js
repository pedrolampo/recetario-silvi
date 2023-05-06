import React, { useState } from 'react';

export const AddRecipeContext = React.createContext();

export function AddRecipeContextProvider({ children }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [category, setCategory] = useState('');

  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const [process, setProcess] = useState('');

  const addIngredient = (e, addIngredientRef) => {
    e.preventDefault();

    if (!addIngredientRef.current.value) return;

    setIngredientsList([...ingredientsList, ingredient]);

    addIngredientRef.current.value = '';
  };

  const removeIngredient = (e, el, key) => {
    if (key > -1) {
      const newArray = ingredientsList.filter((recipe) => recipe !== el);
      setIngredientsList(newArray);
    }
  };

  const value = {
    name,
    image,
    imageUpload,
    ingredientsList,
    process,
    category,
    setName,
    setImage,
    setImageUpload,
    setCategory,
    setIngredient,
    setIngredientsList,
    setProcess,
    addIngredient,
    removeIngredient,
  };

  return (
    <AddRecipeContext.Provider value={value}>
      {children}
    </AddRecipeContext.Provider>
  );
}
