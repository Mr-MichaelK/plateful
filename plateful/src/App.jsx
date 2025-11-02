import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails"; // edited by Noura
import AddEditRecipe from "./pages/AddEditRecipe"; // edited by Noura
import FavoriteRecipes from "./pages/FavoriteRecipes"; // edited by Noura
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* edited by Noura */}
        <Route path="/add" element={<AddEditRecipe />} /> {/* edited by Noura */}
        <Route path="/favorites" element={<FavoriteRecipes />} /> {/* edited by Noura */}

      </Routes>
    </Router>
  );
}

export default App;
