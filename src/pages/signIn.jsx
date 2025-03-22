import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {login} from '../api/userAPI';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
const SignIn = () => {
    const navigate = useNavigate(); // Hook điều hướng
    const {login: setAuthLogin} = useAuth();
    const [formInfo, setFormInfo] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state


    const handleChange = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formInfo.email || !formInfo.password) {
            setError('Please fill in all fields');
            return;
          }
        
        if (formInfo.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setIsLoading(true);
         try{
            const res = await login(formInfo);
            const {token, user} = res;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            console.log(token);
            
            setAuthLogin(true); // set authenticated state to true

            toast.success(`Welcome back, ${user.name}!`, {
                onClose: () => navigate('/home'),
                autoClose: 1500,
            });
            setTimeout(() => {
                navigate('/home');
              }, 1500);
            
            alert("You sign in successfully!");
            setError('');

         } catch(err){
            setError(err.response.data.message || 'Invalid email or password');
         } finally{
            setIsLoading(false);
         }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/background6.jpg)' }}>
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            className="mt-1 w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="email"
                            name="email"
                            placeholder="Enter email..."
                            value={formInfo.email}
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
                        Sign In
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-400 mt-3">
                        Don't have an account? <Link to="/sign-up" className="text-blue-400 hover:underline">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
