import React, { useState, createRef, useContext, useEffect } from 'react';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

import { db } from '../../services/Firebase/firebase';

import { ModifyRecipeContext } from '../../context/ModifyRecipeContext';

import './modifyRecipe.css';

export default function ModifyRecipe() {
  const [processingRecipe, setProcessingRecipe] = useState(true);
  const addIngredientRef = createRef();
  const processRef = createRef();

  const { recipeId } = useParams();

  const {
    name,
    category,
    ingredientsList,
    process,
    setName,
    setCategory,
    setProcess,
    removeIngredient,
    setIngredient,
    setIngredientsList,
    modifyIngredient,
  } = useContext(ModifyRecipeContext);

  useEffect(() => {
    getDoc(doc(db, 'recipes', recipeId)).then((docSnapshot) => {
      setName(docSnapshot.data().title);
      setCategory(docSnapshot.data().category);
      setIngredientsList(docSnapshot.data().ingredients);
      setProcess(docSnapshot.data().process);
      setProcessingRecipe(false);
    });
  }, [recipeId]); //eslint-disable-line

  const update = (e) => {
    e.preventDefault();

    const batch = writeBatch(db);

    const recipe = {
      title: name,
      category: category,
      ingredients: ingredientsList,
      process: process,
    };

    if (
      !recipe.title.length ||
      !recipe.category ||
      recipe.category === 'none' ||
      !recipe.ingredients.length ||
      !recipe.process.length
    ) {
      console.log('error');
      return;
    }

    setProcessingRecipe(true);

    getDoc(doc(db, 'recipes', recipeId))
      .then((docSnapshot) => {
        batch.update(doc(db, 'recipes', docSnapshot.id), {
          category: recipe.category,
          title: recipe.title,
          ingredients: recipe.ingredients,
          process: recipe.process,
        });
        setProcessingRecipe(false);
      })
      .catch((err) => err)
      .finally(() => {
        batch.commit();
      });
  };

  if (processingRecipe) {
    return <p className="loading modify">Cargando...</p>;
  }

  return (
    <div className="modify-recipe">
      <h1>Modificar</h1>
      <form>
        <div className="input-container">
          <label>Nombre:</label>
          <input
            className="input-title"
            type="text"
            placeholder="Tallarines a la puttanesca"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div>
          <label>Categoría:</label>
          <select
            name="catSelect"
            id="catSelect"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="none">Categoría</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </select>
        </div>

        <div className="input-container">
          <label>Ingredientes:</label>
          <ul>
            {ingredientsList.map((el, key) => (
              <li className="ingredients" key={key}>
                {el}{' '}
                <span onClick={(e) => removeIngredient(e, el, key)}>
                  &#10005;
                </span>
              </li>
            ))}
          </ul>
          <div className="add-ingredient">
            <input
              ref={addIngredientRef}
              type="text"
              className="input-ingredient"
              contentEditable
              onChange={(e) => setIngredient(e.target.value)}
            ></input>
            <button onClick={(e) => modifyIngredient(e, addIngredientRef)}>
              Agregar Ingrediente
            </button>
          </div>
        </div>

        <div className="input-container">
          <label>Procedimiento:</label>
          <textarea
            ref={processRef}
            className="input-process"
            value={process}
            onChange={(e) => {
              setProcess(e.target.value);
              e.target.style.height = '0px';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          ></textarea>
        </div>

        <button onClick={(e) => update(e)} className="add-button">
          Aceptar Cambios
        </button>
      </form>
    </div>
  );
}
