import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./Splash/splash.jsx";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Profile from "./user-profile/Profile";
import ProfileWrapper from "./user-profile/components/ProfileWrapper";
import ChangePasswordForm from "./user-profile/components/ChangePasswordForm";
import RecipeDetails from "./pages/RecipeDetails"; // edited by Noura
import AddEditRecipe from "./pages/AddEditRecipe"; // edited by Noura
import FavoriteRecipes from "./pages/FavoriteRecipes"; // edited by Noura
import PrivacyPolicy from "./Auth/PrivacyPolicy.jsx";
import SignUp from "./Auth/SignUp";
import LogIn from "./Auth/LogIn.jsx";
import Contact from "./Contact/Contact.jsx";
import MealPlanner from "./meal-planner/MealPlanner.jsx";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />{" "}
        {/* nour: made splash the root so that it opens first*/}
        <Route path="/home" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="user-info" element={<ProfileWrapper />} />
          <Route path="password" element={<ChangePasswordForm />} />
        </Route>
        <Route path="/recipe/:id" element={<RecipeDetails />} />{" "}
        {/* edited by Noura */}
        <Route path="/add" element={<AddEditRecipe />} />{" "}
        {/* edited by Noura */}
        <Route path="/favorites" element={<FavoriteRecipes />} />{" "}
        {/* edited by Noura */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/meal-plans" element={<MealPlanner />} />
      </Routes>
    </Router>
  );
}
