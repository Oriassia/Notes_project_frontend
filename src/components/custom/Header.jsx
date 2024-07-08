import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // useEffect(() => {}, []);
  return (
    <>
      {loggedInUser ? (
        // header if true
        <header className="bg-white/5 px-4 flex justify-between items-center h-14">
          <div>
            <Link className="text-primary uppercase font-bold text-xl" to="/">
              Logo
            </Link>
          </div>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-1">
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
                  <Link to={"/my-profile"}> My profile </Link>
                </DropdownMenuLabel>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </header>
      ) : (
        //header if false
        <header className="bg-white/5 px-4 flex justify-between items-center h-14">
          <div>
            <Link className="text-primary uppercase font-bold text-xl" to="/">
              Logo
            </Link>
          </div>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex gap-3">
              <Link to={"/auth/login"}>Login</Link>
              <Link to={"/auth/register"}>Register</Link>
            </div>
            <ModeToggle />
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
