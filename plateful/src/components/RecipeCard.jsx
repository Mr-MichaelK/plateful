import React from "react";

const RecipeCard = ({ recipe }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg transition duration-200">
    <img
      src={recipe.image}
      alt={recipe.title}
      className="w-full h-40 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg text-[#7a1f2a]">{recipe.title}</h3>
      <p className="text-sm text-gray-600 mt-2">{recipe.description}</p>
    </div>
  </div>
);

export default RecipeCard;
