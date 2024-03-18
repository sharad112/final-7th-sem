import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import auth from '../../../../firebase/firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast'; // Import Toaster
import { useDispatch } from "react-redux";
import { setUserdata } from "../../../redux/user/userSlice";

function Login() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        number: "",
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.name, data.number);
            const user = userCredential.user;
            console.log(user, "Login success");
            toast.success('Login successful');
        } catch (error) {
            console.error(error, "Login failed");
            const errorMessage = error.message || "Login failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.name, data.number);
            const user = userCredential.user;
            console.log(user, "Signup success");
            toast.success('Signup successful');
        } catch (error) {
            console.error(error, "Signup failed");
            const errorMessage = error.message || "Signup failed";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Register below to continue</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="number"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={data.number}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
                <div className="text-center">
                    <p className="mb-4">Or</p>
                    <button
                        className="w-full py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                        onClick={handleSignup}
                        disabled={loading}
                    >
                        Continue with Google
                    </button>
                </div>
                <p className="text-center mt-4">Don't have an account? <NavLink to="/signup" className="text-blue-500">Sign up</NavLink></p>
            </div>
            {/* Toaster component */}
            <Toaster />
        </div>
    );
}

export default Login;
