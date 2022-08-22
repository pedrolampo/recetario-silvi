import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleRecipe } from '../../services/Firebase/firebase';

import Recipe from '../Recipe/Recipe';

import './recipeContainer.css';

export default function RecipeContainer() {
  const [recipe, setRecipe] = useState();
  const { recipeId } = useParams();

  useEffect(() => {
    getSingleRecipe(recipeId)
      .then((recipe) => {
        setRecipe(recipe);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setRecipe();
    };
  }, [recipeId]);

  return (
    <section className="recipe-container">
      <Recipe recipe={recipe} />
    </section>
  );
}
