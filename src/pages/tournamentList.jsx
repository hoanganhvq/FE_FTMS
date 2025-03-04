import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TournamentList = () => {
    const navigate = useNavigate();

    // Danh sách giải đấu
    const tournaments = [
        { id: 1, name: "Giải đấu A", format: "Bảng đấu", numberClubs: 10, startDate: "2024-03-15", teamsToAdvance:4},
        { id: 2, name: "Giải đấu B", format: "Vòng tròn", numberClubs: 12, startDate: "2024-04-10" },
        { id: 3, name: "Giải đấu C", format: "Bảng đấu", numberClubs: 12, startDate: "2024-05-01" ,teamsToAdvance:8},
        { id: 4, name: "Giải đấu D", format: "Bảng đấu", numberClubs: 7, startDate: "2024-06-20" , teamsToAdvance:2},
        { id: 5, name: "Giải đấu E", format: "Vòng tròn", numberClubs: 6, startDate: "2024-07-05" },
        { id: 6, name: "Giải đấu F", format: "Vòng tròn", numberClubs: 4, startDate: "2024-08-12" },
    ];

    const handleTournamentClick = (tournament) => {
        navigate(`/manage-tournaments/${tournament.id}`, { state: { tournament } });
        console.log("hello: ", tournament);
    };

    return (
        <div className="p-6 min-h-screen bg-gray-950 text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-xl shadow-xl text-center mb-8">
                <h1 className="text-4xl font-extrabold text-white">Danh Sách Giải Đấu</h1>
                <p className="text-gray-300 mt-2 text-lg">Quản lý và theo dõi các giải đấu của bạn</p>
            </div>

            {/* Nút tạo giải đấu mới */}
            <div className="flex justify-center mb-8">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300"
                >
                    + Tạo Giải Đấu Mới
                </motion.button>
            </div>

            {/* Danh sách giải đấu */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map((tournament, index) => (
                    <motion.div
                        key={tournament.id}
                        onClick={() => handleTournamentClick(tournament)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="p-6 border border-gray-700 rounded-2xl bg-gray-800 hover:bg-gray-700 shadow-lg cursor-pointer transform transition duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">{tournament.name}</h2>
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-500 text-white">
                                {tournament.format}
                            </span>
                        </div>
                        <div className="text-gray-300">
                            <p className="text-sm">Số đội: <span className="font-semibold text-gray-100">{tournament.numberClubs}</span></p>
                            <p className="text-sm">Bắt đầu: <span className="font-semibold text-gray-100">{tournament.startDate}</span></p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TournamentList;
