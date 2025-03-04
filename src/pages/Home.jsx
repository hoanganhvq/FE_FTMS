import React from "react";
import { motion } from "framer-motion";

const Home = () => {
    const features = [
        {
            title: "Match Schedule",
            description: "Stay updated with match schedules and key game details for football tournaments.",
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135315.png", // Circular football calendar/schedule icon (white with black outline)
        },
        {
            title: "Detailed Statistics",
            description: "View detailed statistics to optimize your football strategy.",
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135826.png", // Circular football stats/scoreboard icon (white with black outline, already suitable)
        },
        {
            title: "Player Management",
            description: "Easily manage your player roster and tactical formations.",
            image: "https://cdn-icons-png.flaticon.com/512/3135/3135707.png", // Circular football player/team icon (white with black outline, already suitable)
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center p-6 overflow-hidden">
            <div className="max-w-7xl w-full">
                {/* Header with animation */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-7xl md:text-8xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 drop-shadow-2xl animate-pulse-slow"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Football Tournament Management System
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 mt-4 drop-shadow-md animate-slide-in"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        Manage football tournaments, clubs, and tactics with ease!
                    </motion.p>
                </motion.div>

                {/* Features with grid layout and animation */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="bg-blue-900 p-8 rounded-2xl shadow-2xl border border-blue-700 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-teal-600"
                            whileHover={{ y: -10 }}
                            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                        >
                            <motion.img
                                src={feature.image}
                                alt={feature.title}
                                className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-white shadow-md animate-spin-slow"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            <h3 className="text-2xl font-semibold text-white mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300 drop-shadow-md">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-center leading-relaxed animate-fade-in">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                >
                    <motion.button
                        className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:from-teal-500 hover:to-blue-500 transform transition-all duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Managing Now
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

// Animation keyframes (compatible with framer-motion)
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulseSlow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    @keyframes spinSlow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }
    .animate-slide-in {
        animation: slideIn 0.5s ease-out;
    }
    .animate-pulse-slow {
        animation: pulseSlow 4s infinite ease-in-out;
    }
    .animate-spin-slow {
        animation: spinSlow 4s linear infinite;
    }
`;

if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

export default Home;