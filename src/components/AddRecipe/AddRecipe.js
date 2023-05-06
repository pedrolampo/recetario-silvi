import React, { useContext, createRef, useState } from 'react';
import { addDoc, collection, writeBatch } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import { db } from '../../services/Firebase/firebase';
import { storage } from '../../services/Firebase/storage';

import { AddRecipeContext } from '../../context/AddRecipeContext';

import './addRecipe.css';

export default function AddRecipe({ showAddModal }) {
  const [processingRecipe, setProcessingRecipe] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const addIngredientRef = createRef();
  const processRef = createRef();
  const navigate = useNavigate();

  const {
    name,
    image,
    imageUpload,
    category,
    ingredientsList,
    process,
    setName,
    setImage,
    setImageUpload,
    setCategory,
    removeIngredient,
    setIngredient,
    addIngredient,
    setIngredientsList,
    setProcess,
  } = useContext(AddRecipeContext);

  const uploadImage = (e) => {
    e.preventDefault();

    if (imageUpload === null) return;

    setUploadingImage(true);

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setImage(url);
        })
        .catch((err) => {
          console.log(err);
          setUploadingImage('error');
        })
        .finally(() => {
          setUploadingImage('success');
        });
    });
  };

  const imageStatus = () => {
    if (uploadingImage === false) return;
    if (uploadingImage === true) {
      return 'Cargando...';
    }
    if (uploadingImage === 'success') {
      return 'Imagen cargada correctamente';
    }
    if (uploadingImage === 'error') {
      return 'Error al cargar la imagen';
    }
  };

  const submitRecipe = (e) => {
    e.preventDefault();

    const batch = writeBatch(db);

    const recipe = {
      title: name,
      image: image,
      category: category,
      ingredients: ingredientsList,
      process: process,
    };

    if (
      !recipe.title.length ||
      !recipe.image ||
      !recipe.category ||
      recipe.category === 'none' ||
      !recipe.ingredients.length ||
      !recipe.process.length
    ) {
      console.log('error: not all fields filled');
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
        setIngredientsList([]);
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

          <div className="input-container">
            <label>Imagen:</label>
            <input
              className="input-file"
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
            />
            {imageStatus()}
            <button onClick={(e) => uploadImage(e)}>Cargar</button>
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
                Agregar Ingrediente
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
