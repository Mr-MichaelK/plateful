import SignedInHeader from "./SignedInHeader";
import SignedOutHeader from "./SignedOutHeader";

// made by Michael Kolanjian
export default function Header() {
  // if user is authenticated we will render the signed in header
  // else we will render the signed out header
  // since the backend logic remains for phase 2, we will implement
  // this functionality later
  return <SignedOutHeader />;
}
