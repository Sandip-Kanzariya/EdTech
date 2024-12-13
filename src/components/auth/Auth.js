import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export function Auth() {
  const [showSignIn, setShowSignIn] = useState(true);
  const BASE_URI = process.env.REACT_APP_API_URL; // Ensure this is correctly set in your environment variables.
  const navigate = useNavigate();

  // Sign-Up State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const storeData = async () => {
    setIsError("");
    if (!formData["username"] || !formData["password"] || !formData["role"]) {
      setIsError("All fields are required.");
      return;
    }

    if (formData["password"].length < 6) {
      setIsError("Password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URI}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setIsLoading(false);
      if (response.ok) {
        setIsError("");
        alert("User Registered Successfully");
        setShowSignIn(true);
      } else {
        setIsError(data.msg || "Registration failed.");
      }
    } catch (err) {
      setIsLoading(false);
      setIsError("Something went wrong. Please try again.");
    }
  };

  // Sign-In State
  const [loginData, setLoginData] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value.trim() });
  };

  const verifyData = async () => {
    setLoginError("");
    if (!loginData["username"] || !loginData["password"]) {
      setLoginError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URI}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token); // Save token for authenticated requests.
        localStorage.setItem("userRole", data.role); // Save role for role-based access.
        navigate(data.role === "Teacher" ? "/teacher/dashboard" : "/student/dashboard");
      } else {
        setLoginError(data.msg || "Login failed.");
      }
    } catch (err) {
      setLoginError("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/"); // Redirect if already authenticated.
    }
  }, [navigate]);


  return (
    <section className="mt-10 border-collapse">
      <div className="flex justify-center ">
        <button
          className={`btn-toggle ${
            showSignIn ? "active" : ""
          } bg-transparent hover:bg-black hover:text-white border border-black rounded-md py-2 px-4 mr-2`}
          onClick={() => setShowSignIn(true)}
        >
          Sign In
        </button>
        <button
          className={`btn-toggle ${
            showSignIn ? "" : "active"
          } bg-transparent hover:bg-black hover:text-white border border-black rounded-md py-2 px-4`}
          onClick={() => setShowSignIn(false)}
        >
          Sign Up
        </button>
      </div>

      {/*Sign Up*/}
      <div className="items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        {!showSignIn && (
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Create Your Account
            </h2>
            <center className="text-red-500"> {isError} </center>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  {!formData["username"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>{" "}
                  {!formData["password"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Select Role{" "}
                  </label>{" "}
                  {!formData["role"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <select
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="role"
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      Select Role
                    </option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </select>
                
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => storeData()}
                  >
                  {isLoading ? "Loading..." : "Create Account"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/*Sign In */}
        {showSignIn && (
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your Account
            </h2>
            <center className="text-red-500"> {loginError} </center>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Username{" "}
                  </label>{" "}
                  {!loginData["username"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Username"
                      id="username"
                      onChange={handleLogin}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>{" "}
                  {!loginData["password"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleLogin}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => verifyData()}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        <br />
        <center>
          {" "}
          <span className="text-red-500">
            <b>*</b>
          </span>{" "}
          <b>indicates required field</b>
        </center>
      </div>
    </section>
  );
}
