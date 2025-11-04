# Plateful

## Team Members & ID Numbers (Group: Cookies)
* Nour Diab – 202302727 
* Noura Hajj Chehade – 202209255 
* Michael Kolanjian – 202300990 
* Adam Abdel Karim – 202308252

## Assigned Topic
Recipe Collector/Meal Planner

## Primary Data Entities Chosen
* Recipes
* Ingredients
* Users
* Meal Plans

## Link to the Deployed Application

## Detailed Setup Instructions for Running the Frontend Locally
1.	Install Node.js and npm
2.	Install Git
3.	Download the Plateful folder and open it in Visual Studio Code
4.	Make sure you’re on the develop branch
5.	In the terminal, navigate to the project folder by running 'cd plateful'
6.	Run 'npm install' to install all dependencies
7.	Run 'npm install lucide-react'
8.	Run 'npm run dev' to start the development server
9.	Open the URL shown in the terminal (usually 'http://localhost:5173/') in your browser
10.	Explore the app!

## Screenshots Showcasing Key Features

## Team Members’ Primary Contributions
* Nour Diab: Sign Up + Log In 
* Michael Kolanjian: User’s Profile + Meal Plans
* Noura Hajj Chehade: Single Recipe Details + Add/Edit Recipe
* Adam Abdel Karim: Homepage + All Recipes

## How Mock Data Is Being Used to Simulate Interactions
* LogIn Page: Local data is used to validate credentials: only mohammadfarhat@lau.edu.lb with password cookies123 is accepted; any other input returns an error message.
* SignUp Page: Local logic allows sign-ups for all users except the test user with email mohammadfarhat@lau.edu.lb. If this email is submitted (with any name/password), the app notifies that the account already exists and directs the user to log in instead.
* RecipeDetails Page: Local data and mock arrays (mockRecipes, featuredRecipes) are used to fetch recipe details instead of retrieving them from a database. When a user clicks on a recipe, its data is passed through React Router state or matched by title from local arrays. Additionally, recipes saved as favorites are stored and retrieved from localStorage under the key "favoriteRecipes". Editing a recipe also uses localStorage, the selected recipe is saved as "editRecipe" and retrieved when opening the Add/Edit page.
* AddEditRecipe Page: This page simulates recipe creation and editing using local logic. When editing, recipe data is preloaded from localStorage("editRecipe"). On submission, no actual database save occurs, instead, a confirmation alert is displayed through SweetAlert to simulate a successful save action. Categories are loaded from a static local array instead of being fetched from a backend.
* FavoriteRecipes Page: All saved recipes are managed locally through localStorage. When a recipe is saved from the details page, it is appended to the "favoriteRecipes" array. The list of favorites is retrieved from localStorage on component mount. Deleting a favorite updates the same array locally, simulating a backend delete operation.
