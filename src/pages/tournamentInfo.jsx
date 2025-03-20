import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaUsers, FaClock, FaArrowLeft, FaTrophy, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { getTournamentById, addTeamToTournament } from "../api/tounamentAPI";
import { getTeamsById } from "../api/teamAPI";
import { getMe } from "../api/userAPI";
import LoadingScreen from "./loadingScreen";

const TournamentInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [timeLeft, setTimeLeft] = useState({});
  const [timerReady, setTimerReady] = useState(false);
  const [myTeam, setMyTeam] = useState(null);
  const [isTeamRegistered, setIsTeamRegistered] = useState(false);

  // Fetch tournament data
  const fetchTournament = async () => {
    setLoading(true);
    try {
      const res = await getTournamentById(id);
      setTournament(res);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data
  const fetchUser = async () => {
    try {
      const user = await getMe();
      setMyTeam(user.team);
    } catch (error) {
      console.log('Error', error);
    }
  };

  // Fetch team data
  const fetchTeamAttending = async () => {
    setLoading(true);
    try {
      const res = await getTeamsById(tournament.teams);
      setTeams(res.teams);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add team to tournament
  const addTeam = async (teamData) => {
    try {
      await addTeamToTournament(teamData);
      alert("Đăng ký thành công!");
      setIsTeamRegistered(true);
      fetchTournament();
      fetchTeamAttending();
    } catch (error) {
      console.log('Error', error);
      if (error.response?.data?.message === "Team is already registered in this tournament") {
        alert("Your team already register!");
        setIsTeamRegistered(true);
      } else {
        alert("Có lỗi xảy ra khi đăng ký!");
      }
    }
  };

  // Handle registration
  const handleRegister = () => {
    if (!myTeam) {
      alert("Vui lòng tạo đội trước!");
      navigate("/new-club");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn đăng ký giải đấu này không?")) {
      const teamData = {
        teamId: myTeam,
        tournamentId: tournament._id,
      };
      addTeam(teamData);
      console.log('teamData: ', teamData);
    }
  };

  // Calculate time left for countdown
  const calculateTimeLeft = () => {
    const countdownDate = new Date(tournament.time_start).getTime();
    const difference = countdownDate - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return {};
  };

  // Effects
  useEffect(() => {
    fetchTournament();
    fetchUser();
  }, []);

  useEffect(() => {
    if (tournament && tournament.teams?.length > 0) {
      fetchTeamAttending();
    }
  }, [tournament]);

  useEffect(() => {
    if (tournament?.time_start) {
      setTimeLeft(calculateTimeLeft());
      setTimerReady(true);
    }
    if (tournament?.teams && myTeam) {
      const isRegistered = tournament.teams.some(t => t.toString() === myTeam);
      setIsTeamRegistered(isRegistered);
    }
  }, [tournament, myTeam]);

  useEffect(() => {
    if (!timerReady) return;
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, timerReady]);

  // Timer display
  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div key={interval} className="flex flex-col items-center">
      <span className="text-4xl font-extrabold text-indigo-400 animate-pulse">
        {timeLeft[interval] || 0}
      </span>
      <span className="text-xs uppercase text-gray-300 tracking-wider">
        {interval === "days" ? "Ngày" : interval === "hours" ? "Giờ" : interval === "minutes" ? "Phút" : "Giây"}
      </span>
    </div>
  ));

  if (loading || !tournament) {
    return <LoadingScreen message="Đang tải thông tin giải đấu..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800 text-white py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-gray-900/90 rounded-3xl shadow-2xl overflow-hidden border border-indigo-500/30 backdrop-blur-lg animate-fadeIn">
        {/* Header với ảnh bìa */}
        <div className="relative text-center bg-gradient-to-b from-indigo-900/50 to-gray-900">
          <img
            src={tournament.logo}
            alt="Tournament Banner"
            className="w-full h-64 object-cover border-b-4 border-indigo-400 shadow-xl" // Hình chữ nhật ngang
          />
          <h1 className="mt-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500 uppercase tracking-tight py-4">
            {tournament.name}
          </h1>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 p-3 bg-indigo-600/80 rounded-full hover:bg-indigo-500 transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaArrowLeft size={20} />
          </button>
        </div>

        {/* Countdown & Register */}
        <div className="p-8">
          <div className="bg-indigo-900/50 rounded-2xl p-6 shadow-xl border border-indigo-600/30">
            <p className="text-center text-gray-200 mb-4">
              Hạn đăng ký:{" "}
              <span className="font-semibold text-indigo-300">
                {new Date(tournament.time_start).toLocaleDateString("vi-VN")}
              </span>
            </p>
            <div className="flex justify-center gap-6 mb-6">
              {timerComponents.length ? (
                timerComponents
              ) : (
                <span className="text-indigo-400 font-bold text-xl">Giải đấu đã bắt đầu!</span>
              )}
            </div>
            {!isTeamRegistered && (
              <button
                onClick={handleRegister}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-md"
              >
                Đăng Ký Ngay
              </button>
            )}
            {isTeamRegistered && (
              <p className="text-center text-indigo-400 font-semibold">
                Đội của bạn đã đăng ký giải đấu này!
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mt-8 border-b border-indigo-600/50">
            <button
              onClick={() => setActiveTab("details")}
              className={`py-3 px-8 rounded-t-xl font-medium transition-all duration-300 ${
                activeTab === "details"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-indigo-700/50"
              }`}
            >
              <FaInfoCircle className="inline mr-2" /> Thông Tin
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`py-3 px-8 rounded-t-xl font-medium transition-all duration-300 ${
                activeTab === "teams"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-indigo-700/50"
              }`}
            >
              <FaUsers className="inline mr-2" /> Đội Tham Gia
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "details" ? (
              <div className="space-y-6 animate-slideUp">
                <div className="bg-indigo-900/30 p-6 rounded-2xl shadow-md border border-indigo-600/20">
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Chi Tiết Giải Đấu</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
                    <p><FaCalendarAlt className="inline mr-2 text-indigo-400" />Ngày: {new Date(tournament.time_start).toLocaleDateString("vi-VN")}</p>
                    <p><FaUsers className="inline mr-2 text-indigo-400" />Số đội: {tournament.number_of_teams}</p>
                    <p><FaMapMarkerAlt className="inline mr-2 text-indigo-400" />Địa điểm: {tournament.location}</p>
                    <p><FaTrophy className="inline mr-2 text-indigo-400" />Thể thức: {tournament.format}</p>
                  </div>
                </div>
                <div className="bg-indigo-900/30 p-6 rounded-2xl shadow-md border border-indigo-600/20">
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Mô Tả</h2>
                  <p className="text-gray-200 leading-relaxed">{tournament.description}</p>
                </div>
              </div>
            ) : (
              <div className="bg-indigo-900/30 rounded-2xl shadow-md overflow-hidden border border-indigo-600/20 animate-slideUp">
                <table className="w-full text-left">
                  <thead className="bg-indigo-700 text-white">
                    <tr>
                      <th className="px-6 py-4">Tên Đội</th>
                      <th className="px-6 py-4 text-center">Thành Viên</th>
                      <th className="px-6 py-4">Liên Hệ</th>
                      <th className="px-6 py-4 text-center">SĐT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, index) => (
                      <tr
                        key={index}
                        className="border-t border-indigo-600/30 hover:bg-indigo-800/50 transition-all duration-200"
                      >
                        <td className="px-6 py-4 text-gray-200 flex items-center gap-2">
                          {team.logo && <img src={team.logo} alt="Team Logo" className="w-8 h-8 rounded-full" />}
                          {team.name}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-200">{team.members}</td>
                        <td className="px-6 py-4 text-gray-200">{team.createdBy?.name}</td>
                        <td className="px-6 py-4 text-center text-gray-200">{team.createdBy?.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentInformation;