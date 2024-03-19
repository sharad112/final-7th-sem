import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast'; // Import Toaster

function Signup() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            console.log(user, "Signup success");
            toast.success('Signup successful');
            // Redirect to login after successful signup
            navigate("/login");
        } catch (error) {
            console.error(error, "Signup failed");
            const errorMessage = error.message || "Signup failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center mt-4">Already have an account? <NavLink to="/login" className="text-blue-500">Log in</NavLink></p>
            </div>
            {/* Toaster component */}
            <Toaster />
        </div>
    );
}

export default Signup;
