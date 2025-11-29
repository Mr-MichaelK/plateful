import { useAuth } from "../Auth/AuthContext";
import SignedInHeader from "./SignedInHeader";
import SignedOutHeader from "./SignedOutHeader";
import React from "react";

export default function Header() {
  const { user, loading } = useAuth();

  // Prevent UI flash while checking auth
  if (loading) return null;

  // If logged in → show signed-in header
  if (user) {
    return (
      <SignedInHeader
        userProfilePicUrl={user.profilePicUrl ?? null}  // FIXED: safe fallback
      />
    );
  }

  // Otherwise → signed-out header
  return <SignedOutHeader />;
}