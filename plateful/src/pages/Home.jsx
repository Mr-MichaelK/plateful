import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeaturedRecipes from "../components/FeaturedRecipes";
import CategoriesSection from "../components/CategoriesSection";
import MealPlannerSection from "../components/MealPlannerSection";
import NewsletterSection from "../components/NewsletterSection";

const Home = () => (
  <>
    <Navbar />
    <HeroSection />
    <FeaturedRecipes />
    <CategoriesSection />
    <MealPlannerSection />
    <NewsletterSection />
    <Footer />
  </>
);

export default Home;
