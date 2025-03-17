import React, { useState, useEffect } from "react";
import { Route, useLocation, useNavigate, useRoutes, useParams } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaClock, FaArrowLeft, FaTrophy, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { getTournamentById } from "../api/tounamentAPI";
import { getTeamsById } from "../api/teamAPI";
import LoadingScreen from "./loadingScreen";
const TournamentInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //Write correct params variable
  const [loading, setLoading] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [timeLeft, setTimeLeft] = useState({});
  const [timerReady, setTimerReady] = useState(false);

  const handleRegister = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng ký giải đấu này không?")) {
      alert("Đăng ký thành công!");
    }
  };
  const fetchTeamAttending = async () => {
    setLoading(true);
    try {
      const res = await getTeamsById(tournament.teams);
      console.log('Team: ', res)
      //res => object
      //res.teams => array
      setTeams(res.teams);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Teams: ", teams); // Xem log
  }, [teams]);
  
  
  const fetchTournament = async () => {
    setLoading(true);
    try {
      const res = await getTournamentById(id);
      setTournament(res);
      console.log('Tournament with id:', res);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTournament();
    console.log('Tournament with id: ', tournament);
  }, [])
  useEffect(() => {
    if (tournament && tournament.teams?.length > 0) {
      fetchTeamAttending();
      console.log('temas: ', teams);
    }
  }, [tournament]);

  useEffect(() => {
    if (tournament && tournament.time_start) {
      setTimeLeft(calculateTimeLeft());
      setTimerReady(true);
    }
  }, [tournament]);

  useEffect(() => {
    if (!timerReady) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerReady]);



  function calculateTimeLeft() {
    const countdownDate = new Date(tournament.time_start).getTime();
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

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="flex flex-col items-center">
      <span className="text-3xl font-bold text-[#6ab7ff] animate-pulse">
        {timeLeft[interval] || 0}
      </span>
      <span className="text-sm text-gray-400">{interval === "days" ? "Ngày" : interval === "hours" ? "Giờ" : interval === "minutes" ? "Phút" : "Giây"}</span>
    </div>
  ));

  if (loading || !tournament) {
    return <LoadingScreen message="Loading tournament..." />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-5xl relative rounded-2xl overflow-hidden shadow-2xl bg-gray-800/80 backdrop-blur-md border border-gray-700">

        {/* Nút Quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white hover:text-[#6ab7ff] bg-gray-700 p-2 rounded-full shadow-lg transition hover:scale-110"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Header Tournament */}
        <div className="text-center pt-10 pb-8 px-6 border-b border-gray-700">
          <img
            url={tournament.logo}
            alt="Tournament"
            className="w-32 h-32 mx-auto rounded-full border-4 border-[#6ab7ff] shadow-lg"
          />
          <h1 className="text-4xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6ab7ff] to-[#4a9fff] uppercase tracking-wide">
            {tournament.name}
          </h1>
          <p className="text-gray-400 mt-2">Thời gian: {new Date(tournament.time_start).toLocaleDateString('vi-VN')}</p>
        </div>

        {/* Đếm ngược & Đăng ký */}
        <div className="p-6 md:p-8">
          <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg">
            <p className="text-center text-lg text-gray-300 mb-4">
              Đăng ký đến hết ngày{" "}
              <span className="font-bold text-[#6ab7ff]">
                {new Date(tournament.time_start).toLocaleDateString("vi-VN")}
              </span>
            </p>
            <div className="flex justify-center gap-4 text-center text-xl font-semibold mb-4">
              {timerComponents.length ? (
                timerComponents
              ) : (
                <span className="text-[#6ab7ff]">Giải đấu đã bắt đầu!</span>
              )}
            </div>
            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#6ab7ff] to-[#4a9fff] hover:from-[#4a9fff] hover:to-[#6ab7ff] transition transform hover:scale-105"
            >
              Đăng Ký Ngay
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-2 px-6 rounded-t-lg font-semibold transition ${activeTab === "details"
                  ? "bg-[#6ab7ff] text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
            >
              <FaInfoCircle className="inline mr-2" /> Thông Tin
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`py-2 px-6 rounded-t-lg font-semibold transition ${activeTab === "teams"
                  ? "bg-[#6ab7ff] text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
            >
              <FaUsers className="inline mr-2" /> Danh Sách Đội
            </button>
          </div>

          {/* Nội dung Tab */}
          {activeTab === "details" ? (
            <div className="space-y-6">
              {/* Thông tin giải đấu */}
              <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-[#6ab7ff] mb-4">Thông Tin Giải Đấu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <p><FaCalendarAlt className="inline mr-2 text-[#6ab7ff]" />Ngày thi đấu: {new Date(tournament.time_start).toLocaleDateString('vi-VN')}</p>
                  <p><FaUsers className="inline mr-2 text-[#6ab7ff]" />Số đội: {tournament.number_of_teams}</p>
                  <p><FaMapMarkerAlt className="inline mr-2 text-[#6ab7ff]" />Địa điểm: {tournament.location}</p>
                  <p><FaTrophy className="inline mr-2 text-[#6ab7ff]" />Thể thức: {tournament.format}</p>
                </div>
              </div>

              {/* Mô tả */}
              <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-[#6ab7ff] mb-4">Giới Thiệu</h2>
                <p className="text-gray-300 leading-relaxed">
                  {tournament.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-xl shadow-md overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead className="bg-[#6ab7ff] text-white">
                  <tr>
                    <th className="px-4 py-3">Tên Đội</th>
                    <th className="px-4 py-3 text-center">Thành Viên</th>
                    <th className="px-4 py-3">Liên Hệ</th>
                    <th className="px-4 py-3 text-center">SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-3 text-gray-200">{team.name}  {team.logo}</td>
                      <td className="px-4 py-3 text-center text-gray-200">{team.members}</td>
                      <td className="px-4 py-3 text-gray-200">{team.createdBy?.name}</td>
                      <td className="px-4 py-3 text-center text-gray-200">{team.createdBy?.phone}</td>      
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