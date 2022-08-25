import React, { useContext, createRef, useState } from 'react';
import { addDoc, collection, writeBatch } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { db } from '../../services/Firebase/firebase';

import { AddRecipeContext } from '../../context/AddRecipeContext';

import './addRecipe.css';

export default function AddRecipe({ showAddModal }) {
  const [processingRecipe, setProcessingRecipe] = useState(false);
  const addIngredientRef = createRef();
  const processRef = createRef();
  const navigate = useNavigate();

  const {
    name,
    category,
    ingredientsList,
    process,
    setName,
    setCategory,
    removeIngredient,
    setIngredient,
    addIngredient,
    setProcess,
  } = useContext(AddRecipeContext);

  const submitRecipe = (e) => {
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

    addDoc(collection(db, 'recipes'), recipe)
      .then(({ id }) => {
        batch.commit().then(() => console.log(id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProcessingRecipe(false);
        showAddModal(false);
        navigate('/');
      });
  };

  if (processingRecipe) {
    return <h1 className="loading">Cargando la receta...</h1>;
  }

  return (
    <div className="overlay">
      <section className="add-recipe-modal">
        <h1>Agregar una nueva receta</h1>
        <form>
          <div className="input-container">
            <label>Nombre:</label>
            <input
              className="input-title"
              type="text"
              placeholder="Tallarines a la puttanesca"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Categoría:</label>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="none" defaultValue>
                Categoría
              </option>
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
              <button onClick={(e) => addIngredient(e, addIngredientRef)}>
                Agregar
              </button>
            </div>
          </div>

          <div className="input-container">
            <label>Procedimiento:</label>
            <p
              ref={processRef}
              className="input-process"
              type="text"
              contentEditable
              onKeyDown={() => setProcess(processRef.current.textContent)}
            ></p>
          </div>

          <button onClick={(e) => submitRecipe(e)} className="add-button">
            Agregar nueva receta
          </button>
        </form>

        <span className="close-modal" onClick={() => showAddModal(false)}>
          &#10005;
        </span>
      </section>
    </div>
  );
}
