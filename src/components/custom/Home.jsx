import React, { useContext } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-blue-500 dark:bg-gray-700 shadow-lg">
        <div className="max-w-7xl py-6 pl-10">
          <h1 className="text-3xl font-bold text-white">
            Welcome to Task Master
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-3 py-6 sm:px-6 lg:px-8 space-y-6">
          {/* Login/Register Section */}
          {!loggedInUser ? (
            <Card className="shadow-lg transition-transform transform hover:scale-105">
              <CardHeader>
                <h2 className="text-2xl font-bold">Join Us</h2>
              </CardHeader>
              <CardContent className="flex space-x-4">
                <Button className="bg-red-500 text-white">
                  <Link to={"/auth/login"}>Login</Link>
                </Button>
                <Button className="bg-green-500 text-white">
                  <Link to={"/auth/register"}>Register</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          {/* Feature Section */}
          <section>
            <h2 className="text-2xl font-bold text-center">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <Card className="shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <h3 className="text-xl font-bold">Task Management</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Effortlessly manage your tasks and stay organized with our
                    intuitive task manager.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <h3 className="text-xl font-bold">Collaborate</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Work together with your team and achieve your goals faster
                    with our collaboration tools.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <h3 className="text-xl font-bold">Analytics</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Gain insights into your productivity with our advanced
                    analytics and reporting features.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* about section */}
          <h2 className="text-2xl font-bold text-center">About us</h2>
          {/* Our Team card */}
          <Card className="shadow-md">
            <CardHeader>
              <h2 className="text-2xl font-bold">Our Team</h2>
            </CardHeader>
            <CardContent className="flex flex-col space-y-5">
              <p>
                We are a dynamic team committed to providing the best service to
                our customers. Our mission is to deliver high-quality products
                that bring value to your life.
              </p>
              <div className="flex space-x-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <section>
            <h2 className="text-2xl font-bold text-center">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {["John Doe", "Jane Smith", "Sam Wilson"].map((name, index) => (
                <Card
                  key={index}
                  className="shadow-lg transition-transform transform hover:scale-105"
                >
                  <CardHeader className="flex items-center space-x-4">
                    <img
                      src={`https://picsum.photos/seed/picsum${index}/50/50`}
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                    <h3 className="text-xl font-bold">{name}</h3>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {name === "John Doe" &&
                        '"Task Master has revolutionized the way I manage my projects. It\'s simply amazing!"'}
                      {name === "Jane Smith" &&
                        '"The collaboration features are top-notch. I can\'t imagine working without it now."'}
                      {name === "Sam Wilson" &&
                        '"Highly recommend Task Master for anyone looking to boost their productivity!"'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Example Cards Section */}
          <section>
            <h2 className="text-2xl font-bold text-center">
              Explore Our Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              <Card className="shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <h3 className="text-xl font-bold">Stay Organized</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Keep all your tasks in one place and stay on top of your
                    work effortlessly.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-red-500 text-white">Learn More</Button>
                </CardFooter>
              </Card>
              <Card className="shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <h3 className="text-xl font-bold">Boost Productivity</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Utilize our tools to enhance your productivity and achieve
                    more in less time.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-red-500 text-white">Learn More</Button>
                </CardFooter>
              </Card>
              <Card className="shadow-lg transition-transform transform hover:scale-105">
                <CardHeader>
                  <h3 className="text-xl font-bold">Track Progress</h3>
                </CardHeader>
                <CardContent>
                  <p>
                    Monitor your progress with our detailed analytics and
                    reporting features.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-red-500 text-white">Learn More</Button>
                </CardFooter>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
