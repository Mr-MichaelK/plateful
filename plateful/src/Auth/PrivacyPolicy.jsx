// Made by Nour Diab
import React from "react";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "#1e1e1e" : "#FFF8F0";
  const textColor = theme === "dark" ? "#ddd" : "#444";
  const headingColor = theme === "dark" ? "#ffb3b3" : "#800020";
  const sectionTextColor = theme === "dark" ? "#ccc" : "#6b6b6b";

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <main className="flex-grow w-full max-w-3xl mx-auto px-6 py-12">
        <h1
          className="text-4xl font-bold text-center mb-10"
          style={{
            color: headingColor,
            textShadow: "0 1px 2px rgba(0,0,0,0.08)",
          }}
        >
          Terms of Use & Privacy Policy
        </h1>

        <section className="mb-12">
          <h2
            className="text-xl font-semibold mb-4"
            style={{
              color: headingColor,
              textShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            Terms of Use
          </h2>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            Welcome to Plateful. Plateful is a personal meal planner and recipe
            collector that allows users to save recipes, organize meal plans,
            and access food-related content. By creating an account or using
            Plateful in any way, you agree to these Terms of Use. If you do not
            agree, you should not use the application.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            Plateful is provided for personal, non-commercial use. You may use
            the app to store your own recipes and meal plans, but you may not
            use Plateful to post or distribute illegal, harmful, or offensive
            content, to violate the rights of others, or to advertise or resell
            content. You are fully responsible for the content you upload or
            enter into the app. By submitting any content to Plateful, you
            confirm that you have the right to use that content and that it does
            not infringe on any copyright, trademark, or other legal rights.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            Any nutritional information, meal suggestions, or recipe content
            available through Plateful is intended for convenience only.
            Plateful does not guarantee that any recipe, ingredient list, or
            meal plan is safe for you personally, suitable for your diet,
            allergen-free, or medically appropriate. We do not provide medical,
            dietary, or professional nutrition advice. You should always review
            ingredients, allergens, and portion sizes yourself and consult a
            qualified professional if you have health-related or dietary
            concerns. You use recipes and meal plans at your own risk.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            Plateful is provided “as is” and “as available,” without any
            warranty of any kind, whether express or implied. We do not promise
            that the app will always be available, that it will be error-free,
            or that data will never be lost. Features may be added, changed, or
            removed at any time without notice. We are not liable for any
            damage, loss, or inconvenience that results from using the app,
            inability to access the app, or reliance on any content within the
            app.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: sectionTextColor }}
          >
            By using Plateful, you confirm that you are legally allowed to agree
            to these Terms under the laws of your country or region, or that you
            have permission from a parent or legal guardian to do so. We may
            update these Terms of Use from time to time. If you continue using
            Plateful after an update, that means you accept the revised Terms.
          </p>
        </section>

        <section className="mb-12">
          <h2
            className="text-xl font-semibold mb-4"
            style={{
              color: headingColor,
              textShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            Privacy Policy
          </h2>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            This Privacy Policy explains how Plateful collects, stores, and uses
            information. By using Plateful, you agree to the practices described
            here.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            When you create an account on Plateful, we may collect basic
            information that you provide directly, such as your name, email
            address, and password. We also store the content you create inside
            the app, including recipes you save, meal plans you build, and any
            preferences or notes you enter. This information is used to operate
            the core functions of Plateful — for example, to let you sign in, to
            keep your saved content linked to your account, and to display your
            personal data back to you when you return.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            We do not sell your personal information. We do not share your
            personal information with third parties except in limited
            situations: (a) if we are required to do so by law, or (b) when we
            use trusted service providers (for example, hosting or storage
            providers) who help us run the app. In those cases, those service
            providers are only allowed to use the data in order to support
            Plateful and are not allowed to use it for their own purposes.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            Plateful is not designed to collect sensitive health or medical
            information. You should not enter private health details, medical
            conditions, or other sensitive personal data into the app. Although
            we take reasonable steps to protect the information we store, no
            online service can guarantee 100% security. By using Plateful, you
            understand and accept that there is always some level of risk when
            storing information online.
          </p>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: sectionTextColor }}
          >
            You have the right to request that your account and associated data
            be deleted. If you ask for deletion, we will remove your account and
            the content linked to it, and you will no longer be able to access
            any saved recipes or meal plans. Please note that account deletion
            is permanent and cannot be undone.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: sectionTextColor }}
          >
            We may update this Privacy Policy as Plateful develops and new
            features are introduced. If we make changes, we will update the
            text, and by continuing to use Plateful after those changes are
            published, you agree to the updated Privacy Policy.
          </p>
        </section>
      </main>

      <Footer theme={theme} />
    </div>
  );
}

export default PrivacyPolicy;
