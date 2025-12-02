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

## Links to the Deployed Frontend and Backend
Link to the deployed frontend: https://plateful-three.vercel.app/
Link to the deployed backend: https://plateful-backend-dn0i.onrender.com

## Detailed Setup Instructions for Running the Full-Stack Project Locally
1. Download the frontend repository (folder name: plateful).
2. Download the backend repository (folder name: plateful-backend).
3. Create a new folder named plateful-fullstack.
4. Move both the plateful and plateful-backend folders into the plateful-fullstack folder.
5. Open Visual Studio Code.
6. Open the plateful-fullstack folder in VS Code.
7. Open a new terminal in VS Code.
8. Split the terminal into two terminals.
9. In the first terminal, navigate to the frontend folder by running:
   cd plateful
10. In the second terminal, navigate to the backend folder by running:
    cd plateful-backend
11. In the frontend terminal, install dependencies by running:
    npm install
12. In the backend terminal, install dependencies by running:
    npm install
13. In the frontend terminal, start the development server by running:
    npm run dev
14. Note the URL shown in the terminal (usually [http://localhost:5173/](http://localhost:5173/)).
15. In the backend terminal, start the backend server by running:
    node server.js
16. The backend will run on [http://localhost:5001/](http://localhost:5001/).
17. Open the frontend URL in your browser to access the app.
18. The backend will be available at port 5001 while the frontend runs on its shown URL.
19. Explore!

## Comprehensive API Documentation
Swagger: https://plateful-backend-dn0i.onrender.com/api-docs

## Screenshots Showcasing the Final Fully Functional Application
### SignUp Page:

### LogIn Page:

### Home Page:

### Recipes Page:

### RecipeDetails Page:

### AddEditRecipe Page:

### FavoriteRecipes Page:

### MealPlans Page:

### Profile Page:


## Team Members’ Primary Contributions
### Frontend:
* Nour Diab: Sign Up + Log In
* Noura Hajj Chehade: Single Recipe Details + Add/Edit Recipe
* Michael Kolanjian: User’s Profile + Meal Plans
* Adam Abdel Karim: Homepage + All Recipes
  
### Backend:
* Nour Diab:
POST /signup
POST /login
POST /logout
GET /auth/check

* Noura Hajj Chehade:
POST /recipes
PUT /recipes/:title
GET /recipes/:title
GET /comments/:title
POST /comments/:title
POST /favorites/:title
DELETE /recipes/:title
GET /favorites
POST /favorites/:title
DELETE /favorites/:title

* Michael Kolanjian:
PUT /users/profile
DELETE /users/profile
PUT /users/password
GET /meal-plans/:weekStartDate
PUT /meal-plans

* Adam Abdel Karim:
GET /recipes
GET /recipes/featured
GET /recipes/:title
POST /newsletter/subscribe

# Significant Technical Challenges Encountered and How They Were Overcome
First, we encountered a significant technical challenge when the backend server failed to launch on its default port (5000). After investigating, we discovered that macOS was already running a system service on port 5000, which caused the conflict. We resolved this issue by reconfiguring the server to run on port 5001, allowing the application to start and function correctly. Second, for image handling in the backend, we initially faced issues sending images directly to MongoDB, so we implemented Multer, a middleware that processes file uploads. Multer saves each uploaded image inside the backend uploads/ folder with a unique filename, and instead of storing the actual image in MongoDB, we only store the file path (e.g., /uploads/abc123.png). This keeps the database lightweight and efficient while allowing the frontend to load images using these stored paths. Overall, the backend manages physical image storage while MongoDB stores clean references to them.
