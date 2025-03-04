import React from 'react';

const Ranking = ({ tournament, fakeTeamsData }) => {
    return (
        <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-gray-800 rounded-3xl shadow-2xl p-8 overflow-hidden backdrop-blur-sm transform transition-all duration-500 hover:shadow-4xl">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 animate-pulse-slow drop-shadow-md">
                    Bảng Xếp Hạng
                </h2>
                
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-300 animate-slide-in">
                    {tournament.format === 'Vòng tròn' ? 'Bảng Xếp Hạng Chung' : 'Vòng Đấu Bảng'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(tournament.format === 'Vòng tròn' ? [fakeTeamsData] : [fakeTeamsData.slice(0, 2), fakeTeamsData.slice(2, 4)])
                        .map((group, index) => (
                            <div key={index} className="bg-gray-900/30 p-6 rounded-2xl shadow-lg border border-blue-700 backdrop-blur-sm transform transition-all duration-300 hover:scale-102 hover:shadow-xl animate-fade-in">
                                <h4 className="text-xl font-semibold mb-5 text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300 drop-shadow-md">
                                    {tournament.format === 'Bảng đấu' ? `Bảng ${String.fromCharCode(65 + index)}` : 'Bảng Chung'}
                                </h4>
                                <table className="w-full text-white border-collapse">
                                    <thead>
                                        <tr className="text-gray-400 border-b border-gray-700">
                                            <th className="py-3 text-left font-medium">Đội</th>
                                            <th className="py-3 text-center font-medium">Trận</th>
                                            <th className="py-3 text-center font-medium">Thắng</th>
                                            <th className="py-3 text-center font-medium">Hòa</th>
                                            <th className="py-3 text-center font-medium">Thua</th>
                                            <th className="py-3 text-center font-medium">HS</th>
                                            <th className="py-3 text-center font-medium">Thẻ Vàng</th>
                                            <th className="py-3 text-center font-medium">Thẻ Đỏ</th>
                                            <th className="py-3 text-center font-medium">Điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.map((team, teamIndex) => (
                                            <tr 
                                                key={team.id} 
                                                className={`border-b border-gray-700 hover:bg-gray-700/30 transition duration-300 transform hover:scale-101 ${teamIndex % 2 === 0 ? 'bg-gray-900/10' : ''}`}
                                            >
                                                <td className="py-4 flex items-center">
                                                    <img src={team.logo} alt="Team Logo" className="w-8 h-8 mr-4 rounded-full border border-gray-300 shadow-md" />
                                                    <span className="text-gray-200 font-semibold truncate">{team.name}</span>
                                                </td>
                                                <td className="text-center text-gray-300">{team.matchesPlayed}</td>
                                                <td className="text-center text-gray-300">{team.wins}</td>
                                                <td className="text-center text-gray-300">{team.draws}</td>
                                                <td className="text-center text-gray-300">{team.losses}</td>
                                                <td className="text-center text-gray-300">{team.goalDifference}</td>
                                                <td className="text-center text-yellow-400 font-medium">{team.yellowCards}</td>
                                                <td className="text-center text-red-500 font-medium">{team.redCards}</td>
                                                <td className="text-center text-green-400 font-bold">{team.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    ))}
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
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
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
    .animate-slide-in {
        animation: slideIn 0.5s ease-out;
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

export default Ranking;