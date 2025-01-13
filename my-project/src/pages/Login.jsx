import React, { useEffect, useState } from "react";
import Google from '../assets/google.webp'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const response = await axios.post("http://localhost:8000/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        navigate('/')
        toast.success(response.data.message)
        setInput({ email: "", password: "" });
      } else {
        toast(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.log(error)
      // toast.error(response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-0">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please login to your account
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={input.password}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login */}
        {/* <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition duration-300">
          <img src={Google} alt="" className="w-5" />
          Sign in with Google
        </button> */}

        {/* Signup Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
