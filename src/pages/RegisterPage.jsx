import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import api from "@/services/api.service";
import { AuthContext } from "@/components/context/AuthContext";
import { formatJWTTokenToUser } from "@/lib/utils";
import PropTypes from "prop-types";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loggedInUser } = useContext(AuthContext);

  if (loggedInUser) {
    return <Navigate to="/" />;
  }

  async function handleRegisterSubmit(ev) {
    ev.preventDefault(); // Prevent the default form submission

    const formData = new FormData(ev.target);

    const userRegisterData = {
      username: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    };

    try {
      setLoading(true);
      console.log("fetching...");
      const { data } = await api.post("/auth/register", userRegisterData);
    } catch (err) {
      console.error("Error during registration:", err);
      if (err.response && err.response.status === 401) {
        setError("Authentication failed.");
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
      navigate("/auth/login");
    }
  }

  return (
    <Card className="shadow-2xl w-3/4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Register</span> <LogIn />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              name="username"
              id="username"
              placeholder="Enter username..."
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter password..."
            />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="Enter email..."
            />
          </div>
          <div>
            <Label htmlFor="firstName">First name:</Label>
            <Input
              name="firstName"
              id="firstName"
              placeholder="Enter first name..."
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name:</Label>
            <Input
              name="lastName"
              id="lastName"
              placeholder="Enter last name..."
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Creating user..." : "Register"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Already have an account?{" "}
          <Link className="underline font-bold" to="/auth/login">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

RegisterPage.propTypes = {
  login: PropTypes.func,
  loggedInUser: PropTypes.object,
};

export default RegisterPage;
