import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formInfo, setFormInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
        setError(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formInfo.firstName.trim() === '') {
            setError('First name is required.');
            return;
        }
        if (formInfo.lastName.trim() === '') {
            setError('Last name is required.');
            return;
        }

        if (!validateEmail(formInfo.email)) {
            setError('Invalid email address.');
            return;
        }


        if (formInfo.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        console.log("Form Submitted:", formInfo);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/background6.jpg)' }}>
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">First Name</label>
                        <input
                            className="mt-1 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="firstName"
                            placeholder="Enter first name..."
                            value={formInfo.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Last Name</label>
                        <input
                            className="mt-1 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="lastName"
                            placeholder="Enter last name..."
                            value={formInfo.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            className="mt-1 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="email"
                            placeholder="Enter email..."
                            value={formInfo.user}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            className="mt-1 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            name="password"
                            placeholder="Enter password..."
                            value={formInfo.password}
                            onChange={handleChange}
                        />
                       
                    </div>

                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
                    >
                        Sign Up
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-400 mt-3">
                        Already have an account? <Link to="/" className="text-blue-400 hover:underline">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
