import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Profile from "./user-profile/Profile";
import ProfileWrapper from "./user-profile/components/ProfileWrapper";
import ChangePasswordForm from "./user-profile/components/ChangePasswordForm";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="user-info" element={<ProfileWrapper />} />
          <Route path="password" element={<ChangePasswordForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
