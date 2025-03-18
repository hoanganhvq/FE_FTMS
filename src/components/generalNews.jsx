import React from "react";
import { useState, useEffect } from "react";
import {getMatchesByTournamentId} from '../api/matchAPI';


const GeneralNews = ({ tournament }) => {
    const[loading, setLoading] = useState(false);
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Lịch thi đấu và thông tin */}
            <div className="md:col-span-1 space-y-6">
                {/* Lịch thi đấu */}
                

                {/* Thông tin chung */}
                <div className="bg-gray-800 p-5 rounded-2xl shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-4">Thông tin chung</h3>
                    <div className="space-y-3">
                        <div className="bg-gray-700 p-4 rounded-xl border border-gray-600">
                            <p className="text-white">Ngày thi đấu</p>
                            <p className="text-sm text-gray-400">
                                {new Date(tournament.time_start).toLocaleDateString("vi-VN")}
                            </p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-xl border border-gray-600">
                            <p className="text-white">Địa điểm</p>
                            <p className="text-sm text-gray-400">{tournament.location}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thống kê tổng quát */}
            <div className="md:col-span-3 bg-gray-800 p-6 rounded-2xl shadow-xl space-y-8">
                {/* Tiêu đề */}
                <h2 className="text-2xl font-bold text-white">📊 Thống kê tổng quát</h2>

                {/* Thống kê trận đấu */}
                <section>
                    <h4 className="text-lg font-semibold text-gray-300 mb-4">⚽ Trận đấu</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Số bàn thắng", value: "0", color: "text-blue-500" },
                            { label: "Số bàn thua", value: "0", color: "text-red-500" },
                            { label: "Tổng số trận đấu", value: "5", color: "text-green-500" },
                            { label: "Tổng số thẻ phạt", value: "0", color: "text-yellow-500" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-700 p-5 rounded-xl border border-gray-600 hover:bg-gray-600 transition">
                                <p className="text-gray-400">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Thành tích đặc biệt */}
                <section>
                    <h4 className="text-lg font-semibold text-gray-300 mb-4">🏅 Thành tích đặc biệt</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { label: "Trận nhiều bàn nhất", value: "? - ?", color: "text-purple-400" },
                            { label: "Trận nhiều thẻ nhất", value: "? - ?", color: "text-pink-400" },
                            { label: "Số VĐV tham dự", value: "0", color: "text-indigo-400" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-700 p-5 rounded-xl border border-gray-600 hover:bg-gray-600 transition">
                                <p className="text-gray-400">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Thống kê đội bóng */}
                <section>
                    <h4 className="text-lg font-semibold text-gray-300 mb-4">🏟️ Đội bóng</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Đội ghi nhiều bàn nhất", value: "0", color: "text-teal-400" },
                            { label: "Đội nhiều thẻ nhất", value: "0", color: "text-orange-400" },
                            { label: "Cầu thủ nhiều thẻ nhất", value: "0", color: "text-cyan-400" },
                            { label: "Tổng số thẻ vàng", value: "0", color: "text-amber-400" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-700 p-5 rounded-xl border border-gray-600 hover:bg-gray-600 transition">
                                <p className="text-gray-400">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GeneralNews;
