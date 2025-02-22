import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const TeamDetail = () => {
    const location = useLocation();
    const club = location.state?.Club;

    // State để quản lý tab hiện tại
    const [activeTab, setActiveTab] = useState("about");

    if (!club) {
        return (
            <div className="p-6 text-white min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800">
                <p className="text-xl">Không tìm thấy thông tin câu lạc bộ.</p>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                {/* Header với hình ảnh và logo */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                    {club.club_image && (
                        <img
                            src={club.club_image}
                            alt="Club"
                            className="w-full h-full object-cover"
                        />
                    )}
                    {club.club_logo && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <img
                                src={club.club_logo}
                                alt="Logo"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    )}
                </div>

                {/* Tên CLB và thông tin cơ bản */}
                <div className="mt-16 text-center">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                        {club.club_name || "Tên CLB"}
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        📍 {club.address || "Chưa có địa chỉ"} | 🏟 {club.stadium || "Chưa có sân vận động"}
                    </p>
                </div>

                {/* Thanh điều hướng (tabs) */}
                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === "about"
                                ? "bg-sky-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        Giới thiệu
                    </button>
                    <button
                        onClick={() => setActiveTab("members")}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === "members"
                                ? "bg-sky-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        Thành viên
                    </button>
                    <button
                        onClick={() => setActiveTab("stats")}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === "stats"
                                ? "bg-sky-500 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                    >
                        Thống kê
                    </button>
                </div>

                {/* Nội dung của từng tab */}
                <div className="mt-8">
                    {activeTab === "about" && (
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-sky-400 mb-4">Giới thiệu</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <span className="font-medium">🏆 Tên CLB:</span> {club.club_name}
                                </p>
                                <p>
                                    <span className="font-medium">📍 Địa chỉ:</span> {club.address}
                                </p>
                                <p>
                                    <span className="font-medium">🏟 Sân vận động:</span> {club.stadium}
                                </p>
                                <p>
                                    <span className="font-medium">🎽 Màu áo:</span> {club.jersey_color}
                                </p>
                                <p>
                                    <span className="font-medium">📅 Năm thành lập:</span> {club.founded_year}
                                </p>
                                <p>
                                    <span className="font-medium">👤 Huấn luyện viên:</span> {club.coach}
                                </p>
                                <p>
                                    <span className="font-medium">👤 Đội trưởng:</span> {club.captain_name}
                                </p>
                                <p>
                                    <span className="font-medium">📞 Liên hệ:</span> {club.person_contact} - {club.phone_number}
                                </p>
                                <p>
                                    <span className="font-medium">📧 Email:</span> {club.email}
                                </p>
                                <p>
                                    <span className="font-medium">🏆 Thành tích:</span>
                                    <ul className="list-disc list-inside mt-2">
                                        {club.achievements.map((achievement, index) => (
                                            <li key={index}>
                                                {achievement.award} ({achievement.year})
                                            </li>
                                        ))}
                                    </ul>
                                </p>
                                <p>
                                    <span className="font-medium">🌐 Mạng xã hội:</span>
                                    <ul className="list-disc list-inside mt-2">
                                        <li>
                                            <a href={club.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                                                Facebook
                                            </a>
                                        </li>
                                        <li>
                                            <a href={club.social_media.website} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
                                                Website
                                            </a>
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "members" && (
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-sky-400 mb-4">Thành viên</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <span className="font-medium">👥 Số thành viên:</span> {club.number_member}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {club.members.map((member, index) => (
                                        <div key={index} className="flex items-center space-x-4">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-12 h-12 rounded-full border-2 border-white"
                                            />
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-gray-400">{member.position}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p>
                                    <span className="font-medium">👤 Ban huấn luyện:</span>
                                    <ul className="list-disc list-inside mt-2">
                                        {club.staff.map((staff, index) => (
                                            <li key={index}>{staff}</li>
                                        ))}
                                    </ul>
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "stats" && (
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-sky-400 mb-4">Thống kê</h2>

                            {/* Phần Giải thưởng */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-sky-400 mb-2">Giải thưởng</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {club.achievements.map((achievement, index) => (
                                        <li key={index}>
                                            {achievement.award} ({achievement.year})
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Phần Trận đấu */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-sky-400 mb-2">Trận đấu</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    <li>Tổng số trận: {club.statistics.matches_played}</li>
                                    <li>Số trận thắng: {club.statistics.wins}</li>
                                    <li>Số trận hòa: {club.statistics.draws}</li>
                                    <li>Số trận thua: {club.statistics.losses}</li>
                                </ul>
                            </div>

                            {/* Phần Bàn thắng / thua */}
                            <div>
                                <h3 className="text-lg font-semibold text-sky-400 mb-2">Bàn thắng / thua</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    <li>Ghi được: {club.statistics.goals_scored}</li>
                                    <li>Thủng lưới: {club.statistics.goals_conceded}</li>
                                    <li>Phản lưới nhà: {club.statistics.own_goals}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamDetail;