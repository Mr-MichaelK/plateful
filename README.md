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

## Screenshots Showcasing Key Features

## Team Members’ Primary Contributions
* Nour Diab: Sign Up + Log In
* Noura Hajj Chehade: Single Recipe Details + Add/Edit Recipe
* Michael Kolanjian: User’s Profile + Meal Plans
* Adam Abdel Karim: Homepage + All Recipes

## How Mock Data Is Being Used to Simulate Interactions
* LogIn Page: Local data is used to validate credentials: only mohammadfarhat@lau.edu.lb with password cookies123 is accepted; any other input returns an error message.
* SignUp Page: Local logic allows sign-ups for all users except the test user with email mohammadfarhat@lau.edu.lb. If this email is submitted (with any name/password), the app notifies that the account already exists and directs the user to log in instead.
* RecipeDetails Page: Local data and mock arrays (mockRecipes, featuredRecipes) are used to fetch recipe details instead of retrieving them from a database. When a user clicks on a recipe, its data is passed through React Router state or matched by title from local arrays.
Additionally, recipes saved as favorites are stored and retrieved from localStorage under the key "favoriteRecipes". Editing a recipe also uses localStorage, the selected recipe is saved as "editRecipe" and retrieved when opening the Add/Edit page.
* AddEditRecipe Page: This page simulates recipe creation and editing using local logic. When editing, recipe data is preloaded from localStorage("editRecipe"). On submission, no actual database save occurs, instead, a confirmation alert is displayed through SweetAlert to simulate a successful save action. Categories are loaded from a static local array instead of being fetched from a backend.
* FavoriteRecipes Page: All saved recipes are managed locally through localStorage. When a recipe is saved from the details page, it is appended to the "favoriteRecipes" array. The list of favorites is retrieved from localStorage on component mount. Deleting a favorite updates the same array locally, simulating a backend delete operation.
* Home Page (with Featured Recipes): The Home page showcases a section called Featured Recipes, which highlights a small selection of popular dishes. This section uses a subset of the mock data (featuredRecipes), an array of objects containing title, description, and image fields. Each recipe is displayed using the reusable RecipeCard component, which receives the recipe data as props. The grid layout adapts to different screen sizes using Tailwind CSS responsive classes. The purpose of this section is to give users a quick visual preview of some standout recipes and encourage them to explore more by visiting the full Recipes page. The featured data is currently hardcoded for demonstration purposes but is structured in a way that can easily be replaced with API data in the future. This approach allowed for testing the layout, component styling, and dynamic rendering logic without needing a backend.
* Recipes Page: The Recipes page is a standalone page that displays all available recipes using the mockRecipes dataset. This array contains detailed recipe information such as title, description, image, category, whyLove, ingredients, steps, and related similar recipes. The page integrates two key interactive features:
1. Search Functionality: Users can type into a search bar to dynamically filter recipes by title. The filtering is case-insensitive and updates the displayed recipes in real time.
2. Category Filter: A set of buttons allows users to filter recipes by category (e.g., Breakfast, Lunch, Dinner, Dessert, Smoothies). The selected category is highlighted, and the page updates accordingly.
These interactive features are powered by React’s useState and useEffect hooks, along with the React Router’s useLocation and useNavigate for managing category-based navigation through URL parameters. The page uses the same RecipeCard component to display each recipe in a responsive grid layout. If no recipe matches the selected filters or search term, a friendly “No recipes found” message is displayed.
