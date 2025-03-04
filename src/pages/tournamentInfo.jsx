import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaClock, FaArrowLeft, FaTrophy, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";

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
        minutes: Math.floor((difference / (1000 / 60) % 60)),
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

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="flex flex-col items-center">
      <span className="text-3xl font-bold text-[#6ab7ff] animate-pulse">
        {timeLeft[interval] || 0}
      </span>
      <span className="text-sm text-gray-400">{interval === "days" ? "Ngày" : interval === "hours" ? "Giờ" : interval === "minutes" ? "Phút" : "Giây"}</span>
    </div>
  ));

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-6 flex justify-center items-start">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Hiệu ứng nền mờ */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6ab7ff]/10 to-[#4a9fff]/10 opacity-50 pointer-events-none"></div>

        {/* Nút Quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-[#6ab7ff] hover:text-white bg-gray-700 p-2 rounded-full transition transform hover:scale-110 hover:bg-[#6ab7ff]"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={tournament.tournament_image || "https://via.placeholder.com/150"}
            alt="Tournament"
            className="w-36 h-36 mx-auto rounded-full border-4 border-[#6ab7ff] shadow-lg transform hover:scale-105 transition duration-300"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6ab7ff] to-[#4a9fff] uppercase tracking-wide">
            {tournament.tournament_name || "Giải Bóng Đá Vô Địch Quốc Gia 2025"}
          </h1>
        </div>

        {/* Đồng hồ đếm ngược và đăng ký */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-inner mb-8">
          <p className="text-gray-300 text-center text-lg mb-4">
            Đăng ký trực tuyến đến hết ngày <span className="font-bold text-[#6ab7ff]">28/02/2025</span>
          </p>
          <div className="flex justify-center gap-6 mb-6">
            {timerComponents.length ? timerComponents : <span className="text-xl text-[#6ab7ff]">Giải đấu đã bắt đầu!</span>}
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-[#6ab7ff] to-[#4a9fff] hover:from-[#4a9fff] hover:to-[#6ab7ff] text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Đăng Ký Ngay
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 border-b border-gray-600 mb-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 py-2 px-6 text-lg font-semibold rounded-t-lg transition duration-300 ${activeTab === "details" ? "bg-[#6ab7ff] text-white shadow-md" : "text-gray-400 hover:text-[#6ab7ff] hover:bg-gray-700"}`}
          >
            <FaInfoCircle />
            Thông Tin
          </button>
          <button
            onClick={() => setActiveTab("teams")}
            className={`flex items-center gap-2 py-2 px-6 text-lg font-semibold rounded-t-lg transition duration-300 ${activeTab === "teams" ? "bg-[#6ab7ff] text-white shadow-md" : "text-gray-400 hover:text-[#6ab7ff] hover:bg-gray-700"}`}
          >
            <FaUsers />
            Danh Sách Đội
          </button>
        </div>

        {/* Nội dung tab */}
        <div className="min-h-[300px]">
          {activeTab === "details" ? (
            <div className="space-y-6">
              {/* Thông tin cơ bản */}
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-[#6ab7ff] mb-4">Thông Tin Giải Đấu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="flex items-center text-gray-300">
                    <FaCalendarAlt className="text-[#6ab7ff] mr-3" />
                    <span className="font-semibold">Ngày thi đấu:</span> 15/08/2025
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaUsers className="text-[#6ab7ff] mr-3" />
                    <span className="font-semibold">Số đội:</span> 16
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="text-[#6ab7ff] mr-3" />
                    <span className="font-semibold">Địa điểm:</span> Ngã Năm, Sóc Trăng
                  </p>
                  <p className="flex items-center text-gray-300">
                    <FaTrophy className="text-[#6ab7ff] mr-3" />
                    <span className="font-semibold">Thể thức:</span> Đấu loại trực tiếp
                  </p>
                </div>
              </div>

              {/* Giới thiệu */}
              <div className="bg-gray-900 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
                <h2 className="text-2xl font-bold text-[#6ab7ff] mb-4">Giới Thiệu</h2>
                <p className="text-gray-300 leading-relaxed">
                  Giải bóng đá vô địch quốc gia là sự kiện thể thao hàng đầu, quy tụ các đội bóng xuất sắc từ khắp Việt Nam. Đây là nơi diễn ra những trận đấu đỉnh cao và là cơ hội để các cầu thủ giao lưu, học hỏi.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-[#6ab7ff] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Tên Đội</th>
                    <th className="px-4 py-3 text-center">Thành Viên</th>
                    <th className="px-4 py-3 text-left">Người Liên Hệ</th>
                    <th className="px-4 py-3 text-center">SĐT</th>
                    <th className="px-4 py-3 text-center">Ngày Đăng Ký</th>
                    <th className="px-4 py-3 text-center">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredTeams.map((team, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 transition duration-200">
                      <td className="px-4 py-3 text-gray-300">{team.teamName}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{team.members}</td>
                      <td className="px-4 py-3 text-gray-300">{team.contactPerson}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{team.phone}</td>
                      <td className="px-4 py-3 text-center text-gray-300">{team.registeredDate}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${team.status === "Đã xác nhận" ? "bg-green-500" : "bg-yellow-500"} text-gray-900`}
                        >
                          {team.status}
                        </span>
                      </td>
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