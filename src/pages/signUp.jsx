import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/userAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formInfo.name.trim() === '') {
            setError('Full name is required.');
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
    
        try {
            setLoading(true);
            const res = await register(formInfo);
            
            toast.success('User registered successfully. Please log in.', {
                onClose: () => navigate('/home'),
                autoClose: 1500,
            });
            const { token, user } = res;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/sign-in');
            setError('');
        } catch (error) {
            console.error(error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setError('Failed to register user');
                toast.error('Failed to register user');
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/background6.jpg)' }}>
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-5">


                    <div>
                        <label className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            className="mt-1 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            name="name"
                            placeholder="Enter full name..."
                            value={formInfo.name}
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
                        disabled={loading}
                        className={`w-full ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white font-semibold py-3 rounded-md transition-all duration-300`}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>


                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-400 mt-3">
                        Already have an account? <Link to="/" className="text-blue-400 hover:underline">Sign In</Link>
                    </p>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </div>

    );
};

export default SignUp;
