import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider, { AuthContext } from "./components/context/AuthContext";
import MainLayout from "./components/custom/MainLayout";
import AuthLayout from "./components/custom/AuthLayout";
import Tasks from "./components/custom/Tasks";
import Home from "./components/custom/Home";
import MyProfile from "./components/custom/MyProfile";

function ProtectedRoute({ children }) {
  const { loggedInUser } = useContext(AuthContext);

  if (!loggedInUser) {
    return <Navigate to="/auth/login" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />{" "}
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
