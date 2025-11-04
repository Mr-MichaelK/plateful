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
1.	Install npm
2.	Install Git
3.	Download the Plateful folder and open it in Visual Studio Code
4.	Make sure you’re on the main branch
5.	In the terminal, navigate to the project folder by running 'cd plateful'
6.	Run 'npm install' to install all dependencies
7.	Run 'npm run dev' to start the development server
8.	Open the URL shown in the terminal (usually 'http://localhost:5173/') in your browser
9.	Explore the app!

## Screenshots Showcasing Key Features
SignUp Page:
<img width="1867" height="881" alt="image" src="https://github.com/user-attachments/assets/3bbdeb0f-0631-48cd-925a-04181d75c8a2" />

LogIn Page:
<img width="1798" height="788" alt="image" src="https://github.com/user-attachments/assets/3dea2202-6c1c-4c53-ac75-199f790afadb" />

Home Page:
<img width="1914" height="885" alt="image" src="https://github.com/user-attachments/assets/d582cb70-a368-40cf-b4a4-d84db18c556f" />
<img width="1894" height="861" alt="image" src="https://github.com/user-attachments/assets/f272e57f-da19-4b63-9dd1-b7ad97259285" />
<img width="1887" height="867" alt="image" src="https://github.com/user-attachments/assets/19d09da8-ac69-4641-928b-57e10ef6d692" />
<img width="1873" height="710" alt="image" src="https://github.com/user-attachments/assets/8682ec3d-35a8-4df0-81fa-29ea86934e65" />

Recipes Page:
<img width="1888" height="881" alt="image" src="https://github.com/user-attachments/assets/f55ef1db-d7de-4c06-b154-1b5c57e5c4b6" />
<img width="1882" height="862" alt="image" src="https://github.com/user-attachments/assets/6c39ee10-1ac7-4b32-8b72-1d2cd5017d7a" />

RecipeDetails Page:
<img width="1874" height="877" alt="image" src="https://github.com/user-attachments/assets/e0225172-b2da-4694-9c03-8516b9238995" />
<img width="1862" height="895" alt="image" src="https://github.com/user-attachments/assets/121829db-762c-4fb9-8a67-7e28185c5613" />
<img width="1887" height="889" alt="image" src="https://github.com/user-attachments/assets/c7627eb8-61ac-4a50-84ac-58cf8bdbcd16" />
<img width="1883" height="870" alt="image" src="https://github.com/user-attachments/assets/f1f80fb9-3219-4031-a57c-207cd4c3f807" />

AddEditRecipe Page:
<img width="1881" height="873" alt="image" src="https://github.com/user-attachments/assets/950bc2d3-9417-4749-97dc-f6bf016943f6" />
<img width="1884" height="877" alt="image" src="https://github.com/user-attachments/assets/d3a2985f-4208-4a65-8b97-0bb4a341a0a6" />
<img width="1855" height="869" alt="image" src="https://github.com/user-attachments/assets/721a3a8c-f36d-4588-8e19-3973863a9fea" />

FavoriteRecipes Page:
<img width="1879" height="869" alt="image" src="https://github.com/user-attachments/assets/e5eff479-4d4b-405e-b5c9-c9d5b7628773" />

MealPlans Page:
<img width="1867" height="880" alt="image" src="https://github.com/user-attachments/assets/32c898fb-378d-4ea3-8535-8ee950b60104" />
<img width="1815" height="854" alt="image" src="https://github.com/user-attachments/assets/6e1e3168-94e3-4ce0-a655-2b5e72caaeb6" />
<img width="1871" height="897" alt="image" src="https://github.com/user-attachments/assets/f6dc84be-5a21-4e31-b52a-90d3aeb5b6a2" />
<img width="1877" height="880" alt="image" src="https://github.com/user-attachments/assets/6de5a803-c956-4aff-bb4b-4c45f0e3df12" />
<img width="1861" height="870" alt="image" src="https://github.com/user-attachments/assets/ab6c5bfd-daec-4e15-9a6f-3acdc382d2f0" />

Profile Page:
<img width="850" height="264" alt="image" src="https://github.com/user-attachments/assets/fd16a045-1f59-4087-9455-28291cb54cd8" />
<img width="1857" height="882" alt="image" src="https://github.com/user-attachments/assets/112b46d4-c30a-4834-b7f3-801e59558c62" />
<img width="1871" height="878" alt="image" src="https://github.com/user-attachments/assets/fcd2494b-0605-4ca3-a73d-f30b3e49c63b" />
<img width="1863" height="870" alt="image" src="https://github.com/user-attachments/assets/9ffe3d34-0f52-4b0a-8338-12cc01c9d5ef" />

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
* MealPlans Page: Local storage is used to save and persist meals added by the user in the meal planner grid, allowing the selected meals to remain visible even after the page is refreshed or reopened.
* Home Page (with Featured Recipes): The Home page showcases a section called Featured Recipes, which highlights a small selection of popular dishes. This section uses a subset of the mock data (featuredRecipes), an array of objects containing title, description, and image fields. Each recipe is displayed using the reusable RecipeCard component, which receives the recipe data as props. The grid layout adapts to different screen sizes using Tailwind CSS responsive classes. The purpose of this section is to give users a quick visual preview of some standout recipes and encourage them to explore more by visiting the full Recipes page. The featured data is currently hardcoded for demonstration purposes but is structured in a way that can easily be replaced with API data in the future. This approach allowed for testing the layout, component styling, and dynamic rendering logic without needing a backend.
* Recipes Page: The Recipes page is a standalone page that displays all available recipes using the mockRecipes dataset. This array contains detailed recipe information such as title, description, image, category, whyLove, ingredients, steps, and related similar recipes. The page integrates two key interactive features:
1. Search Functionality: Users can type into a search bar to dynamically filter recipes by title. The filtering is case-insensitive and updates the displayed recipes in real time.
2. Category Filter: A set of buttons allows users to filter recipes by category (e.g., Breakfast, Lunch, Dinner, Dessert, Smoothies). The selected category is highlighted, and the page updates accordingly.
These interactive features are powered by React’s useState and useEffect hooks, along with the React Router’s useLocation and useNavigate for managing category-based navigation through URL parameters. The page uses the same RecipeCard component to display each recipe in a responsive grid layout. If no recipe matches the selected filters or search term, a friendly “No recipes found” message is displayed.
