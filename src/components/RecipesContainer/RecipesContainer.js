import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { getRecipes, searchRecipes } from '../../services/Firebase/firebase';

import Card from '../Card/Card';

import './recipesContainer.css';

export default function RecipesContainer() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('MIS RECETAS');
  const [empty, setEmpty] = useState(false);
  const { catId, searchQuery } = useParams();

  const location = useLocation().pathname;

  useEffect(() => {
    if (location.includes('dulce')) {
      setTitle('DULCE');
    } else if (location.includes('salado')) {
      setTitle('SALADO');
    } else if (location === '/') {
      setTitle('MIS RECETAS');
    }

    if (searchQuery) {
      searchRecipes()
        .then((res) => {
          let recipesArray = [];
          res.forEach((el) => {
            if (el.title.toLowerCase().includes(searchQuery.toLowerCase())) {
              recipesArray.push(el);
              setRecipes([...recipesArray]);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    } else {
      getRecipes('category', '==', catId)
        .then((recipes) => {
          setRecipes(recipes);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      setRecipes([]);
    };
  }, [catId, searchQuery, location]);

  const conditionalRecipes = (recipes) => {
    if (recipes.length > 0) {
      return <Card items={recipes} />;
    } else {
      if (empty) {
        return <p>Al parecer no hay ninguna receta</p>;
      }
      setTimeout(() => {
        setEmpty(true);
      }, 3000);
      return <p className="loading">Cargando...</p>;
    }
  };

  return (
    <section className="recipes-container">
      <h1 className="section-title">{title}</h1>
      {conditionalRecipes(recipes)}
    </section>
  );
}
