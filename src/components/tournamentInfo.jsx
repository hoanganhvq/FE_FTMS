import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {FaCalendarAlt, FaUsers, FaClock, FaArrowLeft, FaTrophy, FaInfoCircle,FaMapMarkerAlt  } from "react-icons/fa";

const TournamentInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tournament = location.state?.tournament || {};
  const [activeTab, setActiveTab] = useState("details");

  const handleRegister = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng ký giải đấu này không?")) {
      alert("Đăng ký thành công!");
    }
  };

  const countdownDate = new Date("2025-08-15T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = countdownDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    console.log("Active Tab:", activeTab);
  }, [activeTab]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span key={interval} className="text-3xl font-bold text-[#6ab7ff] animate-pulse">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const registeredTeams = [
    {
      teamName: "Đội A",
      members: 10,
      contactPerson: "Nguyễn Văn A",
      phone: "0123456789",
      registeredDate: "2025-07-01",
      status: "Đã xác nhận",
    },
    {
      teamName: "Đội B",
      members: 12,
      contactPerson: "Trần Thị B",
      phone: "0987654321",
      registeredDate: "2025-07-05",
      status: "Chờ xác nhận",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-gradient-to-b from-gray-800 to-gray-700 p-8 rounded-2xl shadow-lg relative">
        {/* Nút Quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-[#6ab7ff] hover:text-[#4a9fff] text-2xl transition transform hover:scale-110"
        >
          <FaArrowLeft />
        </button>

        {/* Header với hình ảnh và tên giải đấu */}
        <div className="text-center">
          <img
            src={tournament.tournament_image || "https://via.placeholder.com/150"}
            alt="Tournament"
            className="w-32 h-32 mx-auto rounded-full border-4 border-[#6ab7ff] shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#6ab7ff] to-[#4a9fff]">
            {tournament.tournament_name || "Giải Bóng Đá Vô Địch Quốc Gia 2025"}
          </h1>
        </div>

        {/* Thông tin đăng ký và đồng hồ đếm ngược */}
        <div className="mt-6 text-center">
          <p className="text-gray-300 text-lg">
            Giải cho phép đăng ký trực tuyến đến hết ngày 28/02/2025
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            {timerComponents.length ? (
              <div className="flex space-x-2">{timerComponents}</div>
            ) : (
              <span>Giải đấu đã bắt đầu!</span>
            )}
          </div>
          <button
            onClick={handleRegister}
            className="mt-6 bg-gradient-to-r from-[#6ab7ff] to-[#4a9fff] hover:from-[#4a9fff] hover:to-[#6ab7ff] text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Bắt đầu đăng ký
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex justify-center space-x-4 border-b border-gray-600">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-2 px-4 text-lg font-semibold ${activeTab === "details"
                ? "text-[#6ab7ff] border-b-2 border-[#6ab7ff]"
                : "text-gray-400 hover:text-[#6ab7ff]"
              } transition duration-300`}
          >
            <FaInfoCircle className="inline-block mr-2" />
            Thông Tin Chi Tiết
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`py-2 px-4 text-lg font-semibold ${activeTab === "teams"
                ? "text-[#6ab7ff] border-b-2 border-[#6ab7ff]"
                : "text-gray-400 hover:text-[#6ab7ff]"
              } transition duration-300`}
          >
            <FaUsers className="inline-block mr-2" />
            Danh Sách Đội
          </button>
        </div>

        {/* Nội dung của từng tab */}
        <div className="mt-6">
          {activeTab === "details" ? (
            <div className="space-y-6">
              {/* Thông tin cơ bản */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Thông Tin Giải Đấu</h2>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-300">
                    <FaCalendarAlt className="text-[#6ab7ff] mr-3" />
                    <span className="font-semibold">Ngày thi đấu:</span> 15 tháng 8, 2025
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaUsers className="text-[#6ab7ff] mr-3" />
                    <span className="font-semibold">Số lượng đội:</span> 16 đội
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="text-[#6ab7ff] mr-3" /> {/* Icon địa điểm */}
                    <span className="font-semibold">Địa Điểm:</span> Ngã Năm, Sóc Trăng
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaTrophy className="text-[#6ab7ff] mr-3" /> {/* Icon thể thức */}
                    <span className="font-semibold">Thể Thức:</span> Đấu loại trực tiếp
                  </p>
                </div>
              </div>

              {/* Giới thiệu giải đấu */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Giới Thiệu</h2>
                <p className="text-gray-300">
                  Giải bóng đá vô địch quốc gia là một sự kiện thể thao lớn, quy tụ các đội bóng hàng đầu từ khắp cả nước. Giải đấu
                  mang đến những trận cầu đỉnh cao và cơ hội giao lưu, học hỏi cho các cầu thủ.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-white">Tên Đội</th>
                    <th className="px-4 py-2 text-white">Số Lượng Thành Viên</th>
                    <th className="px-4 py-2 text-white">Người Liên Hệ</th>
                    <th className="px-4 py-2 text-white">SĐT Liên Hệ</th>
                    <th className="px-4 py-2 text-white">Thời Gian Đăng Ký</th>
                    <th className="px-4 py-2 text-white">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredTeams.map((team, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="px-4 py-2 text-center text-gray-300">{team.teamName}</td>
                      <td className="px-4 py-2 text-center text-gray-300">{team.members}</td>
                      <td className="px-4 py-2 text-center text-gray-300">{team.contactPerson}</td>
                      <td className="px-4 py-2 text-center text-gray-300">{team.phone}</td>
                      <td className="px-4 py-2 text-center text-gray-300">{team.registeredDate}</td>
                      <td className="px-4 py-2 text-center text-gray-300">{team.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentInformation;