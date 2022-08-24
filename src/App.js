import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AddRecipeContextProvider } from './context/AddRecipeContext';
import { ModifyRecipeContextProvider } from './context/ModifyRecipeContext';

import Header from './components/Header/Header';
import RecipesContainer from './components/RecipesContainer/RecipesContainer';
import Categories from './components/Categories/Categories';
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeContainer from './components/RecipeContainer/RecipeContainer';
import ModifyRecipe from './components/ModifyRecipe/ModifyRecipe';

import './App.css';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="App">
      <ModifyRecipeContextProvider>
        <AddRecipeContextProvider>
          <BrowserRouter>
            <Header showAddModal={setShowAddModal} />
            <Categories />
            <Routes>
              <Route exact path="/" element={<RecipesContainer />} />
              <Route path="/category/:catId" element={<RecipesContainer />} />
              <Route
                path="/search/:searchQuery"
                element={<RecipesContainer />}
              />
              <Route path="/recipe/:recipeId" element={<RecipeContainer />} />
              <Route
                path="/updateRecipe/:recipeId"
                element={<ModifyRecipe />}
              />
            </Routes>
            {showAddModal && <AddRecipe showAddModal={setShowAddModal} />}
          </BrowserRouter>
        </AddRecipeContextProvider>
      </ModifyRecipeContextProvider>
    </div>
  );
}

export default App;
