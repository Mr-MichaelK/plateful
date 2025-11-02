import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeaturedRecipes from "../components/FeaturedRecipes";
import CategoriesSection from "../components/CategoriesSection";
import MealPlannerSection from "../components/MealPlannerSection";
import NewsletterSection from "../components/NewsletterSection";
import Header from "../shared-components/Header";

const Home = () => (
  <>
    <Header />
    <HeroSection />
    <FeaturedRecipes /> 
    <CategoriesSection />
    <MealPlannerSection />
    <NewsletterSection />
    <Footer />
  </>
);

export default Home;
