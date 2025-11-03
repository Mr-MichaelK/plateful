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

## Link to the deployed application

## Detailed setup instructions for running the frontend locally
1.	Have Node.js + npm installed
2.	Have Git installed
3.	Download Plateful folder and open folder in Visual Studio Code
4.	Make sure you are in develop branch
5.	Change cd to plateful by running ‘cd plateful’
6.	Run ‘npm install’
7.	Run ‘npm install lucide-react’
8.	Run ‘npm run dev’
9.	Open the URL that you will get (http://localhost:5173/) in your local browser
10.	Explore!

## Screenshots showcasing key features

## Team Members’ Primary Contributions
* Nour Diab: Sign Up + Log In 
* Michael Kolanjian: User’s Profile + Meal Plans
* Noura Hajj Chehade: Single Recipe Details + Add/Edit Recipe
* Adam Abdel Karim: Homepage + All Recipes

## How mock data is being used to simulate interactions:
* LogIn Page: Local data is used to validate credentials: only mohammadfarhat@lau.edu.lb with password cookies123 is accepted; any other input returns an error message.
* SignUp Page: Local logic allows sign-ups for all users except the test user with email mohammadfarhat@lau.edu.lb. If this email is submitted (with any name/password), the app notifies that the account already exists and directs the user to log in instead.

