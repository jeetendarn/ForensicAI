import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import InvestigatorDashboard from "../pages/InvestigatorDashboard";
import StudentDashboard from "../pages/StudentDashboard";
export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
<Route
  path="/dashboard"
  element={<AdminDashboard />}
/>
<Route
 path="/investigator"
 element={<InvestigatorDashboard />}
/>

<Route
  path="/student"
  element={<StudentDashboard />}
/>

      </Routes>

    </BrowserRouter>

  );
}