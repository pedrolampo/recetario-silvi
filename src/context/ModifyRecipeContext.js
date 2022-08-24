import React, { useState } from 'react';

export const ModifyRecipeContext = React.createContext();

export function ModifyRecipeContextProvider({ children }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  const [process, setProcess] = useState('');

  const modifyIngredient = (e, modifyIngredientRef) => {
    e.preventDefault();

    if (!modifyIngredientRef.current.value) return;

    setIngredientsList([...ingredientsList, ingredient]);

    modifyIngredientRef.current.value = '';
  };

  const removeIngredient = (e, el, key) => {
    if (key > -1) {
      const newArray = ingredientsList.filter((recipe) => recipe !== el);
      setIngredientsList(newArray);
    }
  };

  const value = {
    name,
    ingredientsList,
    process,
    category,
    setName,
    setCategory,
    setIngredient,
    setIngredientsList,
    setProcess,
    modifyIngredient,
    removeIngredient,
  };

  return (
    <ModifyRecipeContext.Provider value={value}>
      {children}
    </ModifyRecipeContext.Provider>
  );
}
