import React from "react";

const GeneralNews = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cột nhỏ - Lịch thi đấu */}
            <div className="md:col-span-1">
                <h3 className="text-lg font-semibold mb-2 text-white">Lịch thi đấu</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Toàn bộ lịch thi đấu</span>
                        <button className="text-blue-500 hover:text-blue-400 transition-colors">
                            Xem thêm
                        </button>
                    </div>
                    <div className="space-y-2">
                        {/* Trận đấu 1 */}
                        <div className="p-3 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-white">Đội #1 vs Đội #2</p>
                            <p className="text-sm text-gray-400">10:00 - 12:00</p>
                        </div>
                        {/* Trận đấu 2 */}
                        <div className="p-3 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-white">Đội #3 vs Đội #4</p>
                            <p className="text-sm text-gray-400">14:00 - 16:00</p>
                        </div>
                        {/* Trận đấu 3 */}
                        <div className="p-3 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-white">Đội #5 vs Đội #6</p>
                            <p className="text-sm text-gray-400">18:00 - 20:00</p>
                        </div>
                    </div>
                </div>

                {/* Thông tin ngày và địa điểm thi đấu */}
                <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h4 className="text-md font-semibold mb-2 text-white">Thông tin chung</h4>
                    <div className="space-y-2">
                        <div className="p-3 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-white">Ngày thi đấu</p>
                            <p className="text-sm text-gray-400">25/10/2023 - 27/10/2023</p>
                        </div>
                        <div className="p-3 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-white">Địa điểm thi đấu</p>
                            <p className="text-sm text-gray-400">Sân vận động A, B, C</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cột rộng - Thống kê tổng quát */}
            <div className="md:col-span-3">
                <h3 className="text-lg font-semibold mb-2 text-white">Thống kê tổng quát</h3>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    {/* Nhóm 1: Thống kê trận đấu */}
                    <h4 className="text-md font-semibold mb-2 text-gray-300">Thống kê trận đấu</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Số bàn thắng</p>
                            <p className="text-xl font-bold text-blue-500">0</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Số bàn thua</p>
                            <p className="text-xl font-bold text-red-500">0</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Tổng số trận đấu</p>
                            <p className="text-xl font-bold text-green-500">5</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Tổng số thẻ phạt</p>
                            <p className="text-xl font-bold text-yellow-500">0</p>
                        </div>
                    </div>

                    {/* Nhóm 2: Thành tích đặc biệt */}
                    <h4 className="text-md font-semibold mb-2 text-gray-300">Thành tích đặc biệt</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Trận nhiều bàn nhất</p>
                            <p className="text-xl font-bold text-purple-500">? - ?</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Trận nhiều thẻ nhất</p>
                            <p className="text-xl font-bold text-pink-500">? - ?</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Số VĐV tham dự</p>
                            <p className="text-xl font-bold text-indigo-500">0</p>
                        </div>
                    </div>

                    {/* Nhóm 3: Thống kê đội bóng */}
                    <h4 className="text-md font-semibold mb-2 text-gray-300">Thống kê đội bóng</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Đội ghi nhiều bàn nhất</p>
                            <p className="text-xl font-bold text-teal-500">0</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Đội nhiều thẻ nhất</p>
                            <p className="text-xl font-bold text-orange-500">0</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Cầu thủ nhiều thẻ nhất</p>
                            <p className="text-xl font-bold text-cyan-500">0</p>
                        </div>
                        <div className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <p className="text-gray-400">Tổng số thẻ vàng</p>
                            <p className="text-xl font-bold text-amber-500">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralNews;