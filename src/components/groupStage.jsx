import React, { useState, useEffect } from 'react';
import { getMatchesByTournamentId, updateMatch } from '../api/matchAPI';
import LoadingScreen from '../pages/loadingScreen';
import { updateGroup } from '../api/groupAPI';

const GroupStage = ({ tournament }) => {
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    const [editingMatchId, setEditingMatchId] = useState(null);
    const [editForm, setEditForm] = useState({
        scoreTeam1: '',
        scoreTeam2: '',
        penaltyTeam1: '',
        penaltyTeam2: '',
        yellowCardsTeam1: '',
        yellowCardsTeam2: '',
        redCardsTeam1: '',
        redCardsTeam2: '',
        venue: '',
        date: '',
        time: ''
    });
    const [currentUserId, setCurrentUserId] = useState(null);

    // Fetch matches from the server
    const fetchMatches = async () => {
        setLoading(true);
        try {
            const res = await getMatchesByTournamentId(tournament._id);
            
            // Lọc các trận đấu có type là "Group Stage"
            const groupStageMatches = res.filter(match => match.type === "Group Stage");
            
            // Sắp xếp các trận đấu theo ngày và giờ
            const sortedMatches = groupStageMatches.sort((a, b) => {
                const dateA = new Date(a.matchDate + 'T' + a.matchTime);
                const dateB = new Date(b.matchDate + 'T' + b.matchTime);
                return dateA - dateB;
            });
            
            setMatches(sortedMatches);
            console.log('Group Stage Match data', sortedMatches);
        } catch (error) {
            console.error('Error fetching matches:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMatches();
        const user = localStorage.getItem('user');
        setCurrentUserId(user ? JSON.parse(user).id : null);
    }, [tournament?._id]);

    const isTournamentCreator = currentUserId && tournament.createdBy?.toString() === currentUserId.toString();

    // Group matches by group name while preserving sorted order
    const groupMatches = () => {
        const grouped = {};
        matches.forEach(match => {
            const groupName = match.group?.name || 'Không xác định';
            if (!grouped[groupName]) {
                grouped[groupName] = [];
            }
            grouped[groupName].push(match);
        });
        return grouped;
    };

    const handleEdit = (match) => {
        setEditingMatchId(match._id);
        const matchDate = new Date(match.matchDate);
        const matchTime = new Date(match.matchTime);
        const adjustedTime = new Date(matchTime.getTime() + 7 * 60 * 60 * 1000); // +7 giờ (UTC+7)
        setEditForm({
            scoreTeam1: match.scoreTeam1 || 0,
            scoreTeam2: match.scoreTeam2 || 0,
            penaltyTeam1: match.penaltyTeam1 || 0,
            penaltyTeam2: match.penaltyTeam2 || 0,
            yellowCardsTeam1: match.yellowCardsTeam1 || 0,
            yellowCardsTeam2: match.yellowCardsTeam2 || 0,
            redCardsTeam1: match.redCardsTeam1 || 0,
            redCardsTeam2: match.redCardsTeam2 || 0,
            venue: match.matchVenue || '',
            date: matchDate.toISOString().split('T')[0],
            time: adjustedTime.toISOString().substr(11, 5), // HH:MM
        });
    };

    const handleSave = async (matchId) => {
        try {
            const [hours, minutes] = editForm.time.split(':').map(Number);
            const matchTimeUTC = new Date(`${editForm.date}T${editForm.time}:00Z`);
            matchTimeUTC.setUTCHours(hours - 7, minutes, 0, 0); // Chuyển về UTC

            const updatedMatch = {
                scoreTeam1: parseInt(editForm.scoreTeam1) || 0,
                scoreTeam2: parseInt(editForm.scoreTeam2) || 0,
                penaltyTeam1: parseInt(editForm.penaltyTeam1) || 0,
                penaltyTeam2: parseInt(editForm.penaltyTeam2) || 0,
                yellowCardsTeam1: parseInt(editForm.yellowCardsTeam1) || 0,
                yellowCardsTeam2: parseInt(editForm.yellowCardsTeam2) || 0,
                redCardsTeam1: parseInt(editForm.redCardsTeam1) || 0,
                redCardsTeam2: parseInt(editForm.redCardsTeam2) || 0,
                matchVenue: editForm.venue,
                matchDate: `${editForm.date}T00:00:00Z`,
                matchTime: matchTimeUTC.toISOString(),
                status: 'Finished',
                type: 'Group Stage',
            };
            console.log('Payload sent to updateMatch:', updatedMatch);
            await updateMatch(matchId, updatedMatch);

            // Update matches and sort by date and time
            const updatedMatches = matches.map(m => 
                m._id === matchId 
                    ? { ...m, ...updatedMatch, matchDate: new Date(updatedMatch.matchDate), matchTime: new Date(updatedMatch.matchTime) } 
                    : m
            ).sort((a, b) => {
                const dateA = new Date(a.matchDate + 'T' + a.matchTime);
                const dateB = new Date(b.matchDate + 'T' + b.matchTime);
                return dateA - dateB;
            });

            setMatches(updatedMatches);
            setEditingMatchId(null);
        } catch (error) {
            console.error('Error updating match:', error.response?.data || error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <LoadingScreen message="Đang tải trận đấu..." />;
    }

    const groupedMatches = groupMatches();

    return (
        <div className="p-6 bg-gradient-to-b from-gray-900 to-black min-h-screen">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-10 text-center tracking-wide">
                Group Stage
            </h1>
            <div className="space-y-12 max-w-5xl mx-auto">
                {Object.entries(groupedMatches).map(([groupName, groupMatches]) => (
                    <div
                        key={groupName}
                        className="bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 rounded-3xl p-6 shadow-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-300 border border-gray-700/50"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b-2 border-blue-500/60 tracking-tight">
                            {groupName}
                        </h2>
                        <div className="space-y-6">
                            {groupMatches.map((match, idx) => (
                                <div
                                    key={match._id || idx}
                                    className={`bg-gray-900/90 rounded-xl p-5 grid grid-cols-[1fr_auto_1fr] items-center gap-8 transition-all duration-300 ${
                                        editingMatchId === match._id ? 'ring-2 ring-blue-600 bg-gray-800/95' : 'hover:bg-gray-850/95 hover:shadow-lg'
                                    }`}
                                >
                                    {/* Team 1 */}
                                    <div className="flex items-center gap-4 justify-end">
                                        <span className="text-lg font-semibold text-white truncate max-w-[220px]">
                                            {match.team1.name}
                                        </span>
                                        <img
                                            src={match.team1.logo}
                                            alt={match.team1.name}
                                            className="w-16 h-16 rounded-full border-2 border-blue-500/80 object-cover shadow-lg"
                                        />
                                    </div>

                                    {/* Match Info */}
                                    {editingMatchId === match._id && isTournamentCreator ? (
                                        <div className="text-center w-64 space-y-4">
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Tỉ số</label>
                                                <div className="flex justify-center items-center gap-2">
                                                    <input
                                                        type="number"
                                                        name="scoreTeam1"
                                                        value={editForm.scoreTeam1}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                    <span className="text-white text-lg font-bold">-</span>
                                                    <input
                                                        type="number"
                                                        name="scoreTeam2"
                                                        value={editForm.scoreTeam2}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Penalty (nếu hòa)</label>
                                                <div className="flex justify-center items-center gap-2">
                                                    <input
                                                        type="number"
                                                        name="penaltyTeam1"
                                                        value={editForm.penaltyTeam1}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                    <span className="text-white text-lg font-bold">-</span>
                                                    <input
                                                        type="number"
                                                        name="penaltyTeam2"
                                                        value={editForm.penaltyTeam2}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Thẻ vàng</label>
                                                <div className="flex justify-center items-center gap-2">
                                                    <input
                                                        type="number"
                                                        name="yellowCardsTeam1"
                                                        value={editForm.yellowCardsTeam1}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                    <span className="text-white text-lg font-bold">-</span>
                                                    <input
                                                        type="number"
                                                        name="yellowCardsTeam2"
                                                        value={editForm.yellowCardsTeam2}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Thẻ đỏ</label>
                                                <div className="flex justify-center items-center gap-2">
                                                    <input
                                                        type="number"
                                                        name="redCardsTeam1"
                                                        value={editForm.redCardsTeam1}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                    <span className="text-white text-lg font-bold">-</span>
                                                    <input
                                                        type="number"
                                                        name="redCardsTeam2"
                                                        value={editForm.redCardsTeam2}
                                                        onChange={handleInputChange}
                                                        className="w-16 text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Địa điểm</label>
                                                <input
                                                    type="text"
                                                    name="venue"
                                                    value={editForm.venue}
                                                    onChange={handleInputChange}
                                                    className="w-full text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                    placeholder="Sân"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Ngày</label>
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={editForm.date}
                                                    onChange={handleInputChange}
                                                    className="w-full text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-400 block mb-1">Giờ</label>
                                                <input
                                                    type="time"
                                                    name="time"
                                                    value={editForm.time}
                                                    onChange={handleInputChange}
                                                    className="w-full text-center bg-gray-700/80 text-white rounded-lg p-2 text-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
                                                />
                                            </div>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => handleSave(match._id)}
                                                    className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Lưu
                                                </button>
                                                <button
                                                    onClick={() => setEditingMatchId(null)}
                                                    className="bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center w-64 flex flex-col items-center justify-center gap-3">
                                            <div>
                                                <span className="text-xs text-gray-500 block">Tỉ số</span>
                                                <span className="text-xl font-bold text-blue-300 bg-gray-800/50 px-4 py-1 rounded-full shadow-inner">
                                                    {match.scoreTeam1 || match.scoreTeam2
                                                        ? `${match.scoreTeam1 || 0} - ${match.scoreTeam2 || 0}`
                                                        : 'Chưa có'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block">Địa điểm</span>
                                                <span className="text-sm text-gray-300 bg-gray-700/30 px-2 py-1 rounded-md truncate w-full">
                                                    {match.matchVenue || 'Chưa có'}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 block">Thời gian</span>
                                                <span className="text-sm text-gray-400 block">
                                                    {new Date(match.matchDate).toLocaleDateString('vi-VN', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                    {' - '}
                                                    {new Date(match.matchTime).toLocaleTimeString('vi-VN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        timeZone: 'Asia/Ho_Chi_Minh',
                                                    })}
                                                </span>
                                            </div>
                                            {isTournamentCreator && (
                                                <button
                                                    onClick={() => handleEdit(match)}
                                                    className="mt-2 bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Chỉnh sửa
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {/* Team 2 */}
                                    <div className="flex items-center gap-4 justify-start">
                                        <img
                                            src={match.team2.logo}
                                            alt={match.team2.name}
                                            className="w-16 h-16 rounded-full border-2 border-blue-500/80 object-cover shadow-lg"
                                        />
                                        <span className="text-lg font-semibold text-white truncate max-w-[220px]">
                                            {match.team2.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupStage;