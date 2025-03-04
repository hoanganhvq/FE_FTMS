import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const TeamDetail = () => {
    const location = useLocation();
    const club = location.state?.Club;

    const [activeTab, setActiveTab] = useState("about");

    if (!club) {
        return (
            <div className="p-6 text-white min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700">
                <p className="text-xl">Không tìm thấy thông tin câu lạc bộ.</p>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700">
                <div className="relative h-64 rounded-lg overflow-hidden">
                    {club.club_image && (
                        <img
                            src={club.club_image}
                            alt="Club"
                            className="w-full h-full object-cover brightness-75"
                        />
                    )}
                    {club.club_logo && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <img
                                src={club.club_logo}
                                alt="Logo"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                        {club.club_name || "Tên CLB"}
                    </h1>
                    <p className="text-gray-300 mt-2 text-lg">
                        {club.address ? `${club.address}` : "Chưa có địa chỉ"}  |  {club.stadium || "Chưa có sân vận động"}
                    </p>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    {[
                        { key: "about", label: "Giới thiệu" },
                        { key: "members", label: `Thành viên (${club.members.length})` },
                        { key: "stats", label: "Thống kê" }
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${
                                activeTab === key
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    {activeTab === "about" && (
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-blue-400 mb-4">Giới thiệu</h2>
                            <div className="space-y-4 text-gray-300">
                                <p><strong>Tên CLB:</strong> {club.club_name}</p>
                                <p><strong>Địa chỉ:</strong> {club.address}</p>
                                <p><strong>Sân vận động:</strong> {club.stadium}</p>
                                <p><strong>Màu áo:</strong> {club.jersey_color}</p>
                                <p><strong>Năm thành lập:</strong> {club.founded_year}</p>
                                <p><strong>Huấn luyện viên:</strong> {club.coach}</p>
                                <p><strong>Đội trưởng:</strong> {club.captain_name}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "members" && (
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-blue-400 mb-4">Thành viên ({club.members.length})</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {club.members.map((member, index) => (
                                    <div key={index} className="relative bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col items-center border-2 border-blue-500">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-24 h-24 object-cover border-4 border-white shadow-md rounded-md"
                                        />
                                        <p className="font-medium text-white mt-3 text-lg">{member.name}</p>
                                        <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-lg shadow-md">#{member.number}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "stats" && (
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-blue-400 mb-4">Thống kê</h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-300 text-lg font-semibold">
                                {[ 
                                    { label: "Tổng số trận", value: club.statistics.matches_played, color: "text-blue-400" },
                                    { label: "Trận thắng", value: club.statistics.wins, color: "text-green-400" },
                                    { label: "Trận hòa", value: club.statistics.draws, color: "text-yellow-400" },
                                    { label: "Trận thua", value: club.statistics.losses, color: "text-red-400" },
                                    { label: "Ghi bàn", value: club.statistics.goals_scored, color: "text-purple-400" },
                                    { label: "Thủng lưới", value: club.statistics.goals_conceded, color: "text-orange-400" }
                                ].map(({ label, value, color }, index) => (
                                    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md text-center border-2 border-gray-600 hover:border-gray-400 transition-all">
                                        <p className={`${color} text-lg font-bold`}>{label}</p>
                                        <p className="text-white text-3xl font-extrabold">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamDetail;
