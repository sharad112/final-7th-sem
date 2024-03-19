import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import auth from "../../../../firebase/firebase"; // Assuming this is the correct path to your Firebase configurations
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const methods = await fetchSignInMethodsForEmail(auth, data.email);
            if (methods.length > 0) {
                // User exists, proceed with login
                const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
                const user = userCredential.user;
                console.log(user, "Login success");
                toast.success('Login successful');
                navigate("/threads");
            } else {
                // User does not exist, display toast message
                toast.error('User does not exist. Please sign up.');
            }
        } catch (error) {
            console.error(error, "Login failed");
            const errorMessage = error.message || "Login failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            value={data.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>
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
                    <NavLink to="/signup" className="text-blue-500">Sign up</NavLink>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
