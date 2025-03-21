import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/20/solid";
import { getTeams } from "../api/teamAPI";
import LoadingScreen from './loadingScreen';

const ClubsDetails = () => {
    const navigate = useNavigate();
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClubs = async () => {
        setLoading(true);
        try {
            const res = await getTeams();
            console.log("Clubs: ", res);
            setClubs(res);
        } catch (error) {
            console.error("Error fetching clubs:", error);
            setError("Failed to load clubs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClubs();
    }, []); 

    const handleNavigate = (club) => {
        console.log("Club before navigate: ", club);
        navigate(`/club/${club._id}`, { state: { club } });
    };

    if (loading) {
        return (
            <LoadingScreen message="Loading Clubs..." />
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8 flex flex-col items-center">
                <div className="relative w-full max-w-5xl mx-auto mb-12">
                    <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white py-4 px-8 rounded-xl shadow-2xl transform -skew-x-6">
                        <SparklesIcon className="w-8 h-8 text-yellow-300 mr-3 animate-spin-slow" />
                        <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider">Football Clubs</h1>
                    </div>
                </div>
                <div className="text-red-400 text-center bg-gray-800 p-6 rounded-lg shadow-md max-w-lg">
                    <p>{error}</p>
                    <button
                        onClick={fetchClubs}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (clubs.length === 0 && !loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8 flex flex-col items-center">
                <div className="relative w-full max-w-5xl mx-auto mb-12">
                    <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white py-4 px-8 rounded-xl shadow-2xl transform -skew-x-6">
                        <SparklesIcon className="w-8 h-8 text-yellow-300 mr-3 animate-spin-slow" />
                        <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider">Football Clubs</h1>
                    </div>
                </div>
                <div className="text-white text-center">No clubs found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
            <div className="relative w-full max-w-5xl mx-auto mb-12">
                <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white py-4 px-8 rounded-xl shadow-2xl transform -skew-x-6">
                    <SparklesIcon className="w-8 h-8 text-yellow-300 mr-3 animate-spin-slow" />
                    <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wider">Football Clubs</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl mx-auto">
                {clubs.map((club) => (
                    <div
                        key={club._id}
                        onClick={() => handleNavigate(club)}
                        className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-700 cursor-pointer group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                        <div className="relative flex justify-center pt-6">
                            <img
                                src={club.logo || "https://source.unsplash.com/100x100/?logo,football"}
                                alt={`${club.name} logo`}
                                className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-md transform group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="relative text-center p-6">
                            <h2 className="text-lg font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                {club.name}
                            </h2>
                            <p className="text-sm text-gray-300 italic">{club.location}</p>
                        </div>
                        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-full -mr-8 -mt-8 transform rotate-45 group-hover:bg-blue-500/40 transition-colors duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubsDetails;