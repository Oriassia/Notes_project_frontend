// import React, { useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ModeToggle } from "./mode-toggle";
// import { AuthContext } from "../context/AuthContext";

// function Header() {
//   const { loggedInUser, logout } = useContext(AuthContext);

//   return (
//     <>
//       {loggedInUser ? (
//         // header if true
//         <header className="bg-white/5 px-4 flex justify-between items-center h-14">
//           <div>
//             <Link className="text-primary uppercase font-bold text-xl" to="/">
//               Task Master
//             </Link>
//           </div>
//           <nav>
//             <ul className="flex gap-4">
//               <li>
//                 <Link to="/tasks">My Tasks</Link>
//               </li>
//               <li>
//                 <Link to="/about">About</Link>
//               </li>
//               <li>
//                 <Link to="/contact">Contact</Link>
//               </li>
//             </ul>
//           </nav>

//           <div className="flex items-center gap-1">
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={loggedInUser?.imgURL} />
//                   <AvatarFallback>
//                     {loggedInUser?.firstName[0].toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>
//                   <Link to={"/my-profile"}> My profile </Link>
//                 </DropdownMenuLabel>
//                 <DropdownMenuItem>Settings</DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <ModeToggle />
//           </div>
//         </header>
//       ) : (
//         //header if false
//         <header className="bg-white/5 px-4 flex justify-between items-center h-14">
//           <div>
//             <Link className="text-primary uppercase font-bold text-xl" to="/">
//               Task Master
//             </Link>
//           </div>
//           <nav>
//             <ul className="flex gap-2">
//               <li>
//                 <Link to="/about">About</Link>
//               </li>
//               <li>
//                 <Link to="/contact">Contact</Link>
//               </li>
//             </ul>
//           </nav>

//           <div className="flex items-center gap-2">
//             <div className="flex gap-3">
//               <Link to={"/auth/login"}>Login</Link>
//               <Link to={"/auth/register"}>Register</Link>
//             </div>
//             <ModeToggle />
//           </div>
//         </header>
//       )}
//     </>
//   );
// }

// export default Header;
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { loggedInUser, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white/5 px-4 flex justify-between items-center h-14">
      <div>
        <Link className="text-primary uppercase font-bold text-xl" to="/">
          Task Master
        </Link>
      </div>
      <nav className="hidden md:flex gap-4">
        <ul className="flex gap-4">
          {loggedInUser && (
            <>
              <li>
                <Link to="/tasks">My Tasks</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        {loggedInUser ? (
          <div className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={loggedInUser?.imgURL} />
                  <AvatarFallback>
                    {loggedInUser?.firstName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <Link to="/my-profile">My profile</Link>
                </DropdownMenuLabel>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <div className="flex gap-3">
              <Link to="/auth/login">Login</Link>
              <Link to="/auth/register">Register</Link>
            </div>
          </div>
        )}
        <ModeToggle />
        <button
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                mobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-white/95 dark:bg-gray-800/95 p-4 shadow-md z-10">
          <nav>
            <ul className="flex flex-col gap-4">
              {loggedInUser ? (
                <>
                  <li>
                    <Link to="/tasks" onClick={toggleMobileMenu}>
                      My Tasks
                    </Link>
                  </li>
                  <li>
                    <Link to="/my-profile" onClick={toggleMobileMenu}>
                      My profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/about" onClick={toggleMobileMenu}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={toggleMobileMenu}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/login" onClick={toggleMobileMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth/register" onClick={toggleMobileMenu}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
