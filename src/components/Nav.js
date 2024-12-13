"use client";

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";

const menuItems = [
  {
    name: "Home",
    href: "/",
    active: true,
  },
  {
    name: "Student Dashboard",
    href: "/student/dashboard",
    active: false, // Default inactive
  },
  {
    name: "Teacher Dashboard",
    href: "/teacher/dashboard",
    active: false, // Default inactive
  },
  {
    name: "Account",
    href: "/account",
    active: true,
  },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // Tracks role (student/teacher)
  const [authToken, setAuthToken] = useState(null); // Tracks authentication token
  const navigate = useNavigate();

  useEffect(() => {
    // Get authToken and userRole from localStorage
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole"); // e.g., "Student" or "Teacher"

    setAuthToken(storedToken);
    setUserRole(storedRole);

    // Dynamically update menu based on role
    menuItems.forEach((item) => {
      if (storedRole === "Student" && item.name === "Student Dashboard") {
        item.active = true;
      }
      if (storedRole === "Teacher" && item.name === "Teacher Dashboard") {
        item.active = true;
      }
    });

    // If no authToken is present, log the user out
    if (!storedToken) {
      logOut();
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    setAuthToken(null);
    setUserRole(null);

    // Reset menu items to default
    menuItems.forEach((item) => (item.active = item.name === "Home" || item.name === "Account"));

    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-slate-100 border-b border-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="inline-flex items-center space-x-2">
          <img src={process.env.PUBLIC_URL + "logo.png"} alt="Logo" className="h-10" />
          <span className="font-bold text-xl">EdTech</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <NavLink
                      className={({ isActive }) =>
                        `inline-flex items-center text-sm font-semibold 
                      ${isActive ? "text-orange-800" : "text-gray-800"} 
                      hover:text-gray-900`
                      }
                      to={item.href}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authToken && (
              <li>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={logOut}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 p-2 lg:hidden">
          <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pb-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2">
                  <img src={process.env.PUBLIC_URL + "logo.png"} alt="Logo" className="h-10" />
                  <span className="font-bold text-xl">EdTech</span>
                </div>
                <button
                  type="button"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-4">
                  {menuItems.map(
                    (item) =>
                      item.active && (
                        <NavLink
                          key={item.name}
                          className={({ isActive }) =>
                            `-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50 
                          ${isActive ? "text-orange-800" : "text-gray-800"}`
                          }
                          to={item.href}
                          onClick={toggleMenu}
                        >
                          <span className="ml-3 text-base font-medium">{item.name}</span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </NavLink>
                      )
                  )}
                  {authToken && (
                    <button
                      type="button"
                      className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      onClick={() => {
                        logOut();
                        toggleMenu();
                      }}
                    >
                      Logout
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
