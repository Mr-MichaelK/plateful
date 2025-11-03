import React from "react";
import Title from "../Auth/components/Title.jsx";
import Box from "../Auth/components/Box.jsx";
import Footer from "../components/Footer.jsx";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#fff8f0] flex flex-col pt-10 md:pt-14">
      <Title
        heading="Contact Us"
        subheading="We’d love to hear from you."
      />

      <Box>
        <p className="text-[#444] leading-relaxed mb-4">
          We’d love to hear from you. Whether you have a recipe idea, feedback on the site,
          or want to collaborate, the Plateful team is here for you. We read every message
          and typically reply within one business day.
        </p>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium text-[#7a1f2a]">Email:</span>{" "}
            <a href="mailto:customerservice@plateful.co" className="underline hover:opacity-80">
              customerservice@plateful.co
            </a>
          </p>
          <p>
            <span className="font-medium text-[#7a1f2a]">Phone (Lebanon):</span>{" "}
            <a href="tel:+96171234567" className="underline hover:opacity-80">
              +961 71 234 567
            </a>
          </p>
        </div>
      </Box>

      <Footer />
    </div>
  );
}
