import React from "react";
import { useLocation } from "react-router-dom";

const TeamDetail = () => {
    const location = useLocation();
    const club = location.state?.Club;

    return (
        <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex justify-center items-center">
            <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-xl shadow-2xl ring-2 ring-blue-500">
                {/* Hình ảnh CLB */}
                <div className="relative">
                    <img src={club.club_image} alt="Club" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                    <img src={club.club_logo} alt="Logo" className="w-20 h-20 rounded-full border-4 border-white shadow-md absolute bottom-[-30px] left-5" />
                </div>

                {/* Tên CLB */}
                <div className="mt-10 text-center">
                    <h1 className="text-3xl font-bold text-sky-400">{club.club_name}</h1>
                    <p className="text-gray-400 mt-1">📍 {club.address} | 🏟 {club.stadium}</p>
                </div>

                {/* Màu áo */}
                <div className="mt-4 text-center">
                    <span className="text-gray-300">🎨 Màu áo:</span>
                    <span className="ml-2 px-4 py-1 rounded-lg text-black font-semibold shadow-md" style={{ backgroundColor: club.jersey_color.toLowerCase() }}>
                        {club.jersey_color}
                    </span>
                </div>

                {/* Ban huấn luyện */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-sky-400 border-b border-sky-500 pb-1">🧑‍🏫 Ban huấn luyện</h2>
                    <p className="mt-2">🏆 <span className="font-semibold text-gray-200">HLV trưởng:</span> {club.coach}</p>
                    <p>🫡 <span className="font-semibold text-gray-200">Đội trưởng:</span> {club.captain_name}</p>
                    <ul className="list-disc ml-6 text-gray-400 mt-2">
                        {club.staff.map((staff, index) => (
                            <li key={index}>{staff}</li>
                        ))}
                    </ul>
                </div>

                {/* Danh sách cầu thủ */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-sky-400 border-b border-sky-500 pb-1">👥 Danh sách cầu thủ</h2>
                    <ul className="grid grid-cols-2 gap-2 text-gray-400 mt-2">
                        {club.members.map((player, index) => (
                            <li key={index} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                                {player.name} - <span className="text-sky-300">{player.position}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Thành tích */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-sky-400 border-b border-sky-500 pb-1">🏆 Thành tích</h2>
                    <ul className="list-disc ml-6 text-gray-400 mt-2">
                        {club.achievements.map((achieve, index) => (
                            <li key={index}>{achieve}</li>
                        ))}
                    </ul>
                </div>

                {/* Thống kê */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-sky-400 border-b border-sky-500 pb-1">📊 Thống kê</h2>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-gray-300">
                        <p className="bg-gray-700 p-3 rounded-lg">✅ Số trận thắng: <span className="font-bold">{club.statistics.wins}</span></p>
                        <p className="bg-gray-700 p-3 rounded-lg">❌ Số trận thua: <span className="font-bold">{club.statistics.losses}</span></p>
                        <p className="bg-gray-700 p-3 rounded-lg">⚽ Bàn thắng: <span className="font-bold">{club.statistics.goals_scored}</span></p>
                        <p className="bg-gray-700 p-3 rounded-lg">🔥 Vua phá lưới: <span className="font-bold">{club.statistics.top_scorer}</span></p>
                    </div>
                </div>

                {/* Liên hệ */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-sky-400 border-b border-sky-500 pb-1">🔗 Liên hệ</h2>
                    <div className="text-gray-300 mt-2">
                        🌍 Website: <a href={club.social_media.website} className="text-blue-400 underline">{club.social_media.website}</a>
                    </div>
                    <div>
                        📘 Facebook: <a href={club.social_media.facebook} className="text-blue-400 underline">{club.social_media.facebook}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDetail;
