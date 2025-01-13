import { Button } from "@/components/ui/button";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import Google from '../assets/google.webp'



const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });
    const {loading} = useSelector(store => store.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            const response = await axios.post("http://localhost:8000/api/v1/user/register", user, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (response.data.success) {
                navigate('/login')
                toast.success(response.data.message)
                // setFormData({ name: "", email: "", password: "", role: "" });
            } else {
                toast(`Error: ${data.message || "Something went wrong"}`);
            }
        } catch (error) {
            // toast.error(error.response.data.message);
            console.log(error);
            
        } finally {
            dispatch(setLoading(false))
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Your Account
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Join us today! It's quick and easy.
                </p>

                {/* Name Input */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={user.name}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

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
                        value={user.email}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={user.password}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </label>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="role" className="flex items-center">
                            <input
                                type="radio"
                                id="r1"
                                name="role"
                                value="student"
                                checked={user.role === "student"}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Student</span>
                        </label>

                        <label htmlFor="role" className="flex items-center">
                            <input
                                type="radio"
                                id="r2"
                                name="role"
                                value="instructor"
                                checked={user.role === "instructor"}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Instructor</span>
                        </label>
                    </div>
                </div>
               
               


                {/* Signup Button */}
                {
                    loading ? <Button className="w-full py-2 px-4 rounded-lg"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please wait</Button> : <Button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Sign Up
                </Button>
                }
                

                {/* Divider */}
                {/* <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-3 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div> */}

                {/* Social Signup */}
                {/* <button className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition duration-300">
                    <img src={Google} alt="" className="w-5" />
                    Sign in with Google
                </button> */}

                {/* Login Redirect */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
