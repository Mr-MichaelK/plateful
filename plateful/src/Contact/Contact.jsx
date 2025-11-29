// Made by Nour Diab
import React from "react";
import Title from "../Auth/components/Title.jsx";
import Box from "../Auth/components/Box.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../shared-components/Header.jsx";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();

  // Section-specific colors
  const sectionBg = theme === "dark" ? "#1a1a1a" : "#fff8f0"; // dark gray vs light cream
  const textColor = theme === "dark" ? "#dfcba6ff" : "#444"; // light text vs dark gray
  const highlightColor = theme === "dark" ? "#f9c8c8" : "#7a1f2a"; // for labels like Email/Phone

  return (
    <>
      <Header />
      <div
        className="min-h-screen flex flex-col pt-10 md:pt-14 transition-colors duration-300"
        style={{ backgroundColor: sectionBg, color: textColor }}
      >
        <Title heading="Contact Us" subheading="We’d love to hear from you." />

        <Box>
          <p className="leading-relaxed mb-4" style={{ color: textColor }}>
            We'd love to hear from you. Whether you have a recipe idea, feedback
            on the site, or want to collaborate, the Plateful team is here for
            you. We read every message and typically reply within one business
            day.
          </p>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium" style={{ color: highlightColor }}>
                Email:
              </span>{" "}
              <a
                href="mailto:customerservice@plateful.co"
                className="underline hover:opacity-80 transition"
                style={{ color: textColor }}
              >
                customerservice@plateful.com
              </a>
            </p>
            <p>
              <span className="font-medium" style={{ color: highlightColor }}>
                Phone (Lebanon):
              </span>{" "}
              <a
                href="tel:+96171234567"
                className="underline hover:opacity-80 transition"
                style={{ color: textColor }}
              >
                +961 71 234 567
              </a>
            </p>
          </div>
        </Box>

        <Footer />
      </div>
    </>
  );
}
