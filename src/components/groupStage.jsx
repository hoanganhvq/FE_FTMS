import React, { useState, useEffect } from 'react';

const GroupStage = ({ tournament }) => {
    const calculateNumberGroups = (numberClubs) => {
        if (numberClubs <= 4) return 1; // Vòng tròn nếu ít đội
        return Math.min(4, Math.ceil(numberClubs / 4)); // Chia thành tối đa 4 nhóm
    };

    const generateRoundRobinFixtures = (teams, numberPitch) => {
        const rounds = [];
        const numTeams = teams.length;
        const half = Math.floor(numTeams / 2);

        for (let round = 0; round < numTeams - 1; round++) {
            const fixtures = [];
            for (let i = 0; i < half; i++) {
                const home = teams[i];
                const away = teams[numTeams - 1 - i];

                const hour = Math.floor(Math.random() * 14) + 8;
                const minute = Math.random() > 0.5 ? "00" : "30";

                fixtures.push({
                    home,
                    away,
                    time: `${hour}:${minute}`,
                    pitch: `Sân ${i % numberPitch + 1}`,
                    score: "-:-",
                });
            }
            rounds.push({
                round: round + 1,
                fixtures,
            });

            teams.splice(1, 0, teams.pop());
        }
        return rounds;
    };

    const divideIntoGroups = (teams, numberGroups) => {
        const groups = [];
        const teamsPerGroup = Math.ceil(teams.length / numberGroups);

        for (let i = 0; i < numberGroups; i++) {
            const groupName = String.fromCharCode(65 + i);
            groups.push({
                name: groupName,
                teams: teams.slice(i * teamsPerGroup, (i + 1) * teamsPerGroup),
            });
        }
        return groups;
    };

    // Đảm bảo useState được gọi đầu tiên, không có điều kiện
    const [scores, setScores] = useState({});

    // Kiểm tra dữ liệu đầu vào
    useEffect(() => {
        console.log('Tournament data passed to GroupStage:', tournament);
    }, [tournament]);

    if (!tournament.numberClubs) {
        return (
            <div className="p-8 min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white">Lỗi: Dữ liệu giải đấu không đầy đủ</h1>
            </div>
        );
    }

    const teams = Array.from({ length: tournament.numberClubs }, (_, i) => `Team ${i + 1}`);
    let fixtures = [];

    if (tournament.format === 'Bảng đấu') {
        const numberGroups = tournament.numberGroup || calculateNumberGroups(tournament.numberClubs);
        console.log('Number of groups:', numberGroups); // Debug: Kiểm tra số nhóm
        const groups = divideIntoGroups(teams, numberGroups);
        groups.forEach((group) => {
            const groupFixtures = generateRoundRobinFixtures(group.teams, tournament.numberPitch || 1);
            fixtures.push({
                group: group.name,
                fixtures: groupFixtures,
            });
        });
    } else if (tournament.format === 'Vòng tròn') {
        fixtures = generateRoundRobinFixtures(teams, tournament.numberPitch || 1);
    }

    const handleScoreChange = (round, index, newScore) => {
        setScores((prevScores) => ({
            ...prevScores,
            [`${round}-${index}`]: newScore,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black p-6 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-gray-800/90 rounded-3xl shadow-2xl p-8 overflow-hidden backdrop-blur-sm transform transition-all duration-500 hover:shadow-4xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-6 rounded-t-3xl mb-6 animate-pulse-slow">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-sky-200 animate-gradient">
                        {tournament.name}
                    </h1>
                </div>

                {tournament.format === 'Bảng đấu' ? (
                    fixtures.length > 0 ? (
                        fixtures.map((group) => (
                            <div key={group.group} className="mb-8 p-6 bg-gray-900/50 rounded-2xl shadow-xl backdrop-blur-lg border border-blue-700 w-full animate-fade-in">
                                <h2 className="text-3xl font-semibold text-blue-400 mb-6 drop-shadow-md">Bảng {group.group}</h2>
                                {group.fixtures.map((round) => (
                                    <div key={round.round} className="mb-6 p-5 bg-gray-800/50 rounded-xl shadow-lg border border-gray-600 transform transition-all duration-300 hover:scale-102">
                                        <h3 className="text-2xl font-medium text-gray-300 mb-4 animate-slide-in">Vòng {round.round}</h3>
                                        <div className="space-y-4">
                                            {round.fixtures.map((fixture, index) => (
                                                <div
                                                    key={index}
                                                    className="p-6 bg-gray-700/50 rounded-xl flex justify-between items-center border border-gray-500 shadow-md hover:bg-gray-600/50 transition duration-300 transform hover:scale-101"
                                                >
                                                    <span className="text-gray-200 font-semibold text-xl w-1/3 text-right truncate">{fixture.home}</span>
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-gray-400 text-base">{fixture.time} - {fixture.pitch}</span>
                                                        <input
                                                            type="text"
                                                            value={scores[`${round.round}-${index}`] || fixture.score}
                                                            onChange={(e) => handleScoreChange(round.round, index, e.target.value)}
                                                            className="mx-4 w-28 text-center text-lg font-bold text-gray-800 bg-white rounded-xl p-2 border border-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                                        />
                                                    </div>
                                                    <span className="text-gray-200 font-semibold text-xl w-1/3 text-left truncate">{fixture.away}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-300">
                            <p>Không có lịch thi đấu cho vòng bảng. Vui lòng kiểm tra dữ liệu giải đấu.</p>
                        </div>
                    )
                ) : (
                    <div className="p-6 bg-gray-900/50 rounded-2xl shadow-xl backdrop-blur-lg border border-yellow-700 w-full animate-fade-in">
                        {fixtures.map((round) => (
                            <div key={round.round} className="mb-6 p-5 bg-gray-800/50 rounded-xl shadow-lg border border-gray-600 transform transition-all duration-300 hover:scale-102">
                                <h3 className="text-2xl font-medium text-gray-300 mb-4 animate-slide-in">Vòng {round.round}</h3>
                                <div className="space-y-4">
                                    {round.fixtures.map((fixture, index) => (
                                        <div
                                            key={index}
                                            className="p-6 bg-gray-700/50 rounded-xl flex justify-between items-center border border-gray-500 shadow-md hover:bg-gray-600/50 transition duration-300 transform hover:scale-101"
                                        >
                                            <span className="text-gray-200 font-semibold text-xl w-1/3 text-right truncate">{fixture.home}</span>
                                            <div className="flex flex-col items-center">
                                                <span className="text-gray-400 text-base">{fixture.time} - {fixture.pitch}</span>
                                                <input
                                                    type="text"
                                                    value={scores[`${round.round}-${index}`] || fixture.score}
                                                    onChange={(e) => handleScoreChange(round.round, index, e.target.value)}
                                                    className="mx-4 w-28 text-center text-lg font-bold text-gray-800 bg-white rounded-xl p-2 border border-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                                />
                                            </div>
                                            <span className="text-gray-200 font-semibold text-xl w-1/3 text-left truncate">{fixture.away}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default GroupStage;