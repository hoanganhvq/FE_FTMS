import React, { useState, useEffect } from 'react';
import { getGroups, createGroup, createGroupMatches } from '../api/groupAPI';
import { updateTournament, getTournamentById } from '../api/tounamentAPI';
import LoadingScreen from '../pages/loadingScreen';

const Ranking = ({ tournament: initialTournament }) => {
    const [tournament, setTournament] = useState(initialTournament);
    const numberOfGroups = tournament.format === "Round Robin" ? 1 : tournament.number_of_group || 0;
    const teams = tournament.teams || [];
    const [loading, setLoading] = useState(false);
    const [isTableCreated, setIsTableCreated] = useState(false);
    const [isMatchCreated, setIsMatchCreated] = useState(false);
    const [groupedTeams, setGroupedTeams] = useState(
        Array.from({ length: numberOfGroups }, () => [])
    );
    const [groupInfo, setGroupInfo] = useState([]);

    // Fetch tournament mới nhất từ server
    const fetchTournament = async () => {
        try {
            setLoading(true);
            const updatedTournament = await getTournamentById(initialTournament._id);
            setTournament(updatedTournament);
            setIsTableCreated(updatedTournament.is_Divided_Group || false);
            setIsMatchCreated(updatedTournament.isGroupMatchesCreated || false);
            if (updatedTournament.is_Divided_Group) {
                await fetchGroups();
            }
        } catch (error) {
            console.error("Error fetching tournament:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch groups từ server
    const fetchGroups = async () => {
        try {
            const res = await getGroups(tournament._id);
            setGroupInfo(res);
            const mappedGroups = res.groups.map(group =>
                group.teams.map(item => ({
                    ...item.team,
                    matchesPlayed: item.matchesPlayed,
                    wins: item.wins,
                    draws: item.draws,
                    losses: item.losses,
                    goalsFor: item.goalsFor || 0,
                    goalsAgainst: item.goalsAgainst || 0,
                    yellowCards: item.yellowCards,
                    redCards: item.redCards,
                    points: item.points,
                }))
            );
            setGroupedTeams(mappedGroups);
        } catch (error) {
            console.error("Error fetching groups: ", error);
        }
    };

    // Đánh dấu đã chia bảng và tạo trận đấu
    const markTournamentAsGrouped = async () => {
        try {
            await updateTournament(tournament._id, { 
                is_Divided_Group: true, 
                isGroupMatchesCreated: true 
            });
            setIsMatchCreated(true);
            setTournament({ ...tournament, is_Divided_Group: true, isGroupMatchesCreated: true });
        } catch (err) {
            console.error("Error updating tournament:", err.response?.data);
        }
    };

    // Chia bảng
    const handleGroupTeams = async () => {
        const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
        const newGrouped = Array.from({ length: numberOfGroups }, () => []);

        if (tournament.format === "Round Robin") {
            // Round-Robin: tất cả đội vào 1 bảng
            newGrouped[0] = shuffledTeams;
        } else {
            // Group Stage: chia đều vào các bảng
            shuffledTeams.forEach((team, index) => {
                newGrouped[index % numberOfGroups].push(team);
            });
        }
        console.log('Shuffled teams:', newGrouped);
        setGroupedTeams(newGrouped);

        try {
            setLoading(true);
            for (let i = 0; i < newGrouped.length; i++) {
                const groupData = { groupIndex: i, teams: newGrouped[i] };
                await createGroup(tournament._id, groupData);
            }
            await fetchGroups();
            setIsTableCreated(true);
            await updateTournament(tournament._id, { is_Divided_Group: true });
            setTournament({ ...tournament, is_Divided_Group: true });
        } catch (error) {
            console.error("Error uploading grouped teams:", error);
        } finally {
            setLoading(false);
        }
    };

    // Tạo trận đấu dựa trên format
    const handleCreateMatches = async () => {
        try {
            setLoading(true);
            await createGroupMatches(groupInfo); // Giả định API xử lý logic Round-Robin và Group Stage
            await markTournamentAsGrouped();
            await fetchGroups(); // Cập nhật lại dữ liệu sau khi tạo trận đấu
        } catch (error) {
            console.error("Error creating matches:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTournament();
    }, [initialTournament._id]);

    const renderTeamRow = (team, teamIndex, groupIndex) => {
        const isTop1 = teamIndex === 0;
        const medal = ['🥇', '🥈', '🥉'][teamIndex] || '';
        const rankLabel = tournament.format === 'Round Robin'
            ? `#${teamIndex + 1}`
            : `${String.fromCharCode(65 + groupIndex)}${teamIndex + 1}`;
        const barWidth = Math.min(100, (team.points || 0) * 5);

        return (
            <tr
                key={team._id}
                className={`border-b border-gray-700 hover:bg-gray-700/30 transition duration-300 transform hover:scale-101 ${teamIndex % 2 === 0 ? 'bg-gray-900/10' : ''} ${isTop1 ? 'border-2 border-yellow-400 bg-yellow-200/5' : ''}`}
            >
                <td className="py-4 flex items-center">
                    <span className="text-sm text-gray-400 mr-3">{rankLabel}</span>
                    <img src={team.logo} alt="Team Logo" className="w-8 h-8 mr-3 rounded-full border border-gray-300 shadow-md" />
                    <span className="text-gray-200 font-semibold truncate">
                        {team.name} {medal}
                    </span>
                </td>
                <td className="text-center text-gray-300">{team.matchesPlayed || 0}</td>
                <td className="text-center text-gray-300">{team.wins || 0}</td>
                <td className="text-center text-gray-300">{team.draws || 0}</td>
                <td className="text-center text-gray-300">{team.losses || 0}</td>
                <td className="text-center text-gray-300">{team.goalsFor - team.goalsAgainst || 0}</td>
                <td className="text-center text-yellow-400 font-medium">{team.yellowCards || 0}</td>
                <td className="text-center text-red-500 font-medium">{team.redCards || 0}</td>
                <td className="text-center text-green-400 font-bold relative">
                    {team.points || 0}
                    <div className="h-1 mt-1 bg-green-500/30 rounded overflow-hidden">
                        <div
                            className="h-1 bg-green-400 transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                        ></div>
                    </div>
                </td>
            </tr>
        );
    };

    if (loading) {
        return <LoadingScreen message="Loading..." />;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-gray-800 rounded-3xl shadow-2xl p-8 overflow-hidden backdrop-blur-sm">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 animate-pulse-slow drop-shadow-md">
                    Bảng Xếp Hạng
                </h2>
                <h3 className="text-2xl font-semibold mb-6 text-center text-gray-300 animate-slide-in">
                    {tournament.format === 'Round Robin' ? 'Bảng Xếp Hạng Chung' : 'Vòng Đấu Bảng'}
                </h3>
                {!isTableCreated && (
                    <div className="text-center mb-6">
                        <button
                            onClick={handleGroupTeams}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                        >
                            {loading ? 'Đang chia bảng...' : 'Chia Bảng'}
                        </button>
                    </div>
                )}
                {isTableCreated && !isMatchCreated && (
                    <div className="text-center mb-6">
                        <button
                            onClick={handleCreateMatches}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
                        >
                            {loading ? 'Đang tạo trận đấu...' : 'Tạo Trận Đấu'}
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-8">
                    {groupedTeams.map((group, index) => (
                        <div key={index} className="bg-gray-900/30 p-6 rounded-2xl shadow-lg border border-blue-700 backdrop-blur-sm">
                            <h4 className="text-xl font-semibold mb-5 text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-teal-300 drop-shadow-md">
                                {tournament.format === 'Round Robin' ? 'Bảng Chung' : `Bảng ${String.fromCharCode(65 + index)}`}
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
                                    {[...group]
                                        .sort((a, b) => {
                                            const pointsA = a.points || 0;
                                            const pointsB = b.points || 0;
                                            const diffA = (a.goalsFor || 0) - (a.goalsAgainst || 0);
                                            const diffB = (b.goalsFor || 0) - (b.goalsAgainst || 0);
                                            const winsA = a.wins || 0;
                                            const winsB = b.wins || 0;

                                            if (pointsB !== pointsA) return pointsB - pointsA;
                                            if (diffB !== diffA) return diffB - diffA;
                                            return winsB - winsA;
                                        })
                                        .map((team, teamIndex) =>
                                            renderTeamRow(team, teamIndex, index)
                                        )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ranking;