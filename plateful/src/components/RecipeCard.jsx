import React from "react";
import { useNavigate } from "react-router-dom"; // edited by Noura

const RecipeCard = ({ recipe, id }) => {
  const navigate = useNavigate(); // edited by Noura

  const handleClick = () => {
    navigate(`/recipe/${id}`); // edited by Noura (navigate to RecipeDetails page)
  };

  return (
    <div
      onClick={handleClick} // edited by Noura (make card clickable)
      className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200 cursor-pointer hover:scale-[1.02]"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#7a1f2a]">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;

