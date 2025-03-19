import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GeneralNews from '../components/generalNews';
import Ranking from '../components/ranking';
import GroupStage from '../components/groupStage';
import KnockoutStage from '../components/knockoutStage';
import DivideGroups from '../components/divideGroup';
import LoadingScreen from "./loadingScreen";
import {getGroups} from '../api/groupAPI';
const ManageTournament = () => {
    const [activeTab, setActiveTab] = useState('tin-chung');
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); // Lấy id từ URL
    const location = useLocation(); // Lấy state từ navigation
    const { tournament } = location.state || {}; // Lấy thông tin giải đấu từ state
    const [teams, setTeams] = useState([]);
    const fakeTeamsData = [
        {
            id: 1,
            name: "Đội 1",
            logo: "https://via.placeholder.com/20",
            matchesPlayed: 3,
            wins: 2,
            draws: 1,
            losses: 0,
            goalDifference: "+3",
            points: 7,
            yellowCards: 4,
            redCards: 1,
        },
        {
            id: 2,
            name: "Đội 2",
            logo: "https://via.placeholder.com/20",
            matchesPlayed: 3,
            wins: 1,
            draws: 1,
            losses: 1,
            goalDifference: "+1",
            points: 4,
            yellowCards: 2,
            redCards: 0,
        },
        {
            id: 3,
            name: "Đội 3",
            logo: "https://via.placeholder.com/20",
            matchesPlayed: 3,
            wins: 3,
            draws: 0,
            losses: 0,
            goalDifference: "+5",
            points: 9,
            yellowCards: 1,
            redCards: 0,
        },
        {
            id: 4,
            name: "Đội 4",
            logo: "https://via.placeholder.com/20",
            matchesPlayed: 3,
            wins: 0,
            draws: 1,
            losses: 2,
            goalDifference: "-2",
            points: 1,
            yellowCards: 5,
            redCards: 2,
        },
    ];

    const fetchGroup = () =>{
        
    }

    // Kiểm tra nếu không có dữ liệu giải đấu
    if (!tournament) {
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 text-white animate-pulse">Lỗi: Không tìm thấy thông tin giải đấu</h1>
                <h1 className="text-2xl font-bold mb-4 text-white animate-pulse">ID: {id}</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-gray-800/90 rounded-3xl shadow-2xl p-8 overflow-hidden backdrop-blur-sm transform transition-all duration-500 hover:shadow-4xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 rounded-t-3xl mb-6 animate-pulse-slow">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-sky-200 animate-gradient">
                        {tournament.name}
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 border-b border-gray-700 mb-6">
                    <button
                        className={`py-3 px-6 rounded-t-xl font-semibold transition duration-300 transform ${activeTab === 'tin-chung' ? 'bg-blue-500 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200 hover:scale-102'}`}
                        onClick={() => setActiveTab('tin-chung')}
                    >
                        Tin Chung
                    </button>
                    {tournament.format ==="Group Stage" && (
                        <>
                            <button
                                className={`py-3 px-6 rounded-t-xl font-semibold transition duration-300 transform ${activeTab === 'vong-bang' ? 'bg-teal-500 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200 hover:scale-102'}`}
                                onClick={() => setActiveTab('vong-bang')}
                            >
                                Vòng Bảng
                            </button>
                            <button
                                className={`py-3 px-6 rounded-t-xl font-semibold transition duration-300 transform ${activeTab === 'vong-loai-truc-tiep' ? 'bg-pink-500 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200 hover:scale-102'}`}
                                onClick={() => setActiveTab('vong-loai-truc-tiep')}
                            >
                                Vòng Loại Trực Tiếp
                            </button>
                        </>
                    )}
                    {tournament.format === "Round Robin" && (
                        <button
                            className={`py-3 px-6 rounded-t-xl font-semibold transition duration-300 transform ${activeTab === 'lich-thi-dau' ? 'bg-green-500 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200 hover:scale-102'}`}
                            onClick={() => setActiveTab('lich-thi-dau')}
                        >
                            Lịch Thi Đấu
                        </button>
                    )}
                    <button
                        className={`py-3 px-6 rounded-t-xl font-semibold transition duration-300 transform ${activeTab === 'bang-xep-hang' ? 'bg-purple-500 text-white shadow-md scale-105' : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200 hover:scale-102'}`}
                        onClick={() => setActiveTab('bang-xep-hang')}
                    >
                        Bảng Xếp Hạng
                    </button>
                

                </div>

                {/* Nội dung tab */}
                <div className="min-h-[400px] animate-fade-in">
                    {activeTab === 'tin-chung' && (
                        <GeneralNews tournament={tournament}/>
                    )}
                    {activeTab === 'lich-thi-dau' && (
                        <GroupStage tournament={tournament} />
                    )}
                    {activeTab === 'vong-bang' && (
                        <GroupStage tournament={tournament} />
                    )}
                    {activeTab === 'vong-loai-truc-tiep' && (
                        <KnockoutStage tournament={tournament} teams={tournament.teams} />
                    )}
                    {activeTab === 'bang-xep-hang' && (
                        <Ranking tournament={tournament}/>
                    )}
                </div>
            </div>
        </div>
    );
};

// Animation keyframes
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulseSlow {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }
    .animate-pulse-slow {
        animation: pulseSlow 4s infinite ease-in-out;
    }
    .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 10s ease infinite;
    }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

export default ManageTournament;