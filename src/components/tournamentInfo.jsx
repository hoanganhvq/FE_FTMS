import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaUsers, FaTrophy, FaListUl, FaArrowLeft } from "react-icons/fa";

const TournamentInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tournament = location.state?.tournament || {};

  const handleRegister = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng ký giải đấu này không?")) {
      alert("Đăng ký thành công!");
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 opacity-20 rounded-2xl"></div>

        {/* Nút Quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-yellow-400 hover:text-yellow-500 text-2xl transition"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text uppercase drop-shadow-lg">
          Giải Bóng Đá Vô Địch Quốc Gia 2025
        </h1>

        <div className="mt-6 space-y-5 text-lg">
          <p className="flex items-center">
            <FaMapMarkerAlt className="text-yellow-400 mr-3" />
            <span className="font-semibold text-yellow-400">Địa điểm:</span> {tournament.id || "Chưa cập nhật"}
          </p>
          <p className="flex items-center">
            <FaCalendarAlt className="text-yellow-400 mr-3" />
            <span className="font-semibold text-yellow-400">Thời gian:</span> Ngày 15 tháng 8, 2025
          </p>
          <p className="flex items-center">
            <FaMoneyBillWave className="text-yellow-400 mr-3" />
            <span className="font-semibold text-yellow-400">Lệ phí tham gia:</span> 5.000.000 VND / đội
          </p>
          <p className="flex items-center">
            <FaUsers className="text-yellow-400 mr-3" />
            <span className="font-semibold text-yellow-400">Số đội tham gia:</span> 16 đội
          </p>
          <p className="flex items-center">
            <FaTrophy className="text-yellow-400 mr-3" />
            <span className="font-semibold text-yellow-400">Giải thưởng:</span> 500.000.000 VND cho đội vô địch
          </p>
          <p className="flex items-center">
            <FaListUl className="text-yellow-400 mr-3" />
            <span className="font-semibold text-yellow-400">Thể thức:</span> Vòng bảng + Loại trực tiếp
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleRegister}
            className="relative bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Đăng Ký Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentInformation;
