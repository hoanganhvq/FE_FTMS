import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getTournamentsByUserId } from "../api/tounamentAPI";
import LoadingScreen from "./loadingScreen";


const TournamentList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [tournaments, setTournaments] = useState([]);

    const fetchTournament = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await getTournamentsByUserId(token); // truyền token, không phải userId
            setTournaments(res);
        } catch (err) {
            console.log('Error fetching Tournament: ', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTournament();
        const token = localStorage.getItem('token');
        console.log("token: ", token)
    }, [])


    const handleTournamentClick = (tournament) => {
        navigate(`/manage-tournaments/${tournament._id}`, { state: { tournament } });
        console.log("hello: ", tournament);
    };

    if(!tournaments || loading) {
        return <LoadingScreen />
    }
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
                {tournaments.map((tournament, index) => {
                    // Gán màu theo status
                    const statusColorMap = {
                        Upcoming: "bg-green-500",
                        Ongoing: "bg-yellow-500",
                        Ended: "bg-red-500"
                    };

                    const status = tournament.status || "Upcoming";
                    const tagColor = statusColorMap[status] || "bg-gray-500";

                    return (
                        <motion.div
                            key={tournament.id}
                            onClick={() => handleTournamentClick(tournament)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 shadow-lg border border-gray-700 cursor-pointer transition duration-300"
                        >
                            {/* Tiêu đề và trạng thái */}
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-white leading-tight">{tournament.name}</h2>
                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${tagColor} text-white shadow-md`}>
                                    {status}
                                </span>
                            </div>

                            {/* Thông tin giải đấu */}
                            <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400 font-medium">Thể thức:</span>
                                    <span className="text-white font-semibold">{tournament.format}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400 font-medium">Số đội:</span>
                                    <span className="text-white font-semibold">{tournament.number_of_teams}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-400 font-medium">Bắt đầu:</span>
                                    <span className="text-white font-semibold">
                                        {new Date(tournament.time_start).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 border-t border-gray-700 pt-3 text-right">
                                <span className="text-sm italic text-gray-400">Nhấn để xem chi tiết</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>


        </div>
    );
};

export default TournamentList;
