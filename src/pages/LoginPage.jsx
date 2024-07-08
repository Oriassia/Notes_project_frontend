import React, { useContext, useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loggedInUser } = useContext(AuthContext);
  const { toast } = useToast();

  if (loggedInUser) {
    return <Navigate to="/" />;
  }

  async function handleLoginSubmit(ev) {
    ev.preventDefault(); // Prevent the default form submission

    const formData = new FormData(ev.target);

    const userLoginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
      setLoading(true);
      console.log("fetching...");
      const { data } = await api.post("/auth/login", userLoginData);
      const { token } = data;
      const userId = formatJWTTokenToUser(token); // user = {userId : "" }
      if (userId) {
        await login({ ...userId, token });

        toast({
          title: "logged in sucssfully",
          description: `${loggedInUser}`,
        });
        console.log("user logged in sucessfully", loggedInUser);
      } else {
        setError("Invalid token received");
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response && err.response.status === 401) {
        setError("Authentication failed.");
      } else {
        setError("An error occurred.");
      }
    } finally {
      setLoading(false);
      navigate("/");
    }
  }

  return (
    <Card className="shadow-2xl w-3/4 ">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Login</span> <LogIn />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              name="username"
              id="username"
              placeholder="Enter username..."
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="Enter password..."
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          Don't have an account?{" "}
          <Link className="underline font-bold" to="/auth/register">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

LoginPage.propTypes = {
  login: PropTypes.func,
  loggedInUser: PropTypes.object,
};

export default LoginPage;
