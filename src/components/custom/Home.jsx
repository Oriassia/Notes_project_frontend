import React, { useContext } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Welcome to Our Website</h1>
            <Button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
            {/* About Us Section */}
            <Card className="shadow-md">
              <CardHeader>
                <h2 className="text-2xl font-bold">About Us</h2>
              </CardHeader>
              <CardContent>
                <p>
                  We are a dynamic team committed to providing the best service
                  to our customers. Our mission is to deliver high-quality
                  products that bring value to your life.
                </p>
              </CardContent>
            </Card>

            {/* Our Team Section */}
            <Card className="shadow-md">
              <CardHeader>
                <h2 className="text-2xl font-bold">Our Team</h2>
              </CardHeader>
              <CardContent className="flex space-x-4">
                <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-1/3">
                  <h3 className="text-lg font-bold">Jane Doe</h3>
                  <p>CEO</p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-1/3">
                  <h3 className="text-lg font-bold">John Smith</h3>
                  <p>CTO</p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg w-1/3">
                  <h3 className="text-lg font-bold">Emily Johnson</h3>
                  <p>COO</p>
                </div>
              </CardContent>
            </Card>

            {/* Login/Register Section */}
            {!loggedInUser ? (
              <Card className="shadow-md">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Join Us</h2>
                </CardHeader>
                <CardContent className="flex space-x-4">
                  <Button className="bg-red-500 text-white">Login</Button>
                  <Button className="bg-red-500 text-white">Register</Button>
                </CardContent>
              </Card>
            ) : null}

            {/* Contact Form Section */}
            <Card className="shadow-md">
              <CardHeader>
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      className="w-full"
                    />
                  </div>
                  <Button className="bg-red-500 text-white">Send</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
