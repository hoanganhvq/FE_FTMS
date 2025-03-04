import React, { useState } from "react";

const ManagePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    number: "",
    image: "",
    goals: 0,
  });
  const [teamStats, setTeamStats] = useState({
    goalsScored: 0,
    goalsConceded: 0,
    yellowCards: 0,
    redCards: 0,
    wins: 0,
    losses: 0,
  });
  const [error, setError] = useState("");

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.position || !newPlayer.number) {
      setError("⚠️ Vui lòng điền đủ thông tin!");
      return;
    }
    if (players.some((player) => player.number === newPlayer.number)) {
      setError("⚠️ Số áo đã tồn tại!");
      return;
    }
    setPlayers([...players, newPlayer]);
    setNewPlayer({ name: "", position: "", number: "", image: "", goals: 0 });
    setError("");
  };

  const handleEditPlayer = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  const handleDeletePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleEditStats = (field, value) => {
    setTeamStats({ ...teamStats, [field]: parseInt(value) || 0 });
  };

  const statLabels = {
    goalsScored: "Bàn thắng",
    goalsConceded: "Bàn thua",
    yellowCards: "Thẻ vàng",
    redCards: "Thẻ đỏ",
    wins: "Thắng",
    losses: "Thua",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">⚽ Quản lý cầu thủ</h1>

      {/* Danh sách cầu thủ */}
      <h2 className="text-xl font-semibold mb-4">📋 Danh sách cầu thủ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center relative transition-all hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={player.image || "https://via.placeholder.com/100"}
                alt="Player"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 mb-4"
              />
              <button
                onClick={() => handleDeletePlayer(index)}
                className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ❌
              </button>
            </div>
            <div className="w-full space-y-3">
              <input
                type="text"
                value={player.name}
                onChange={(e) => handleEditPlayer(index, "name", e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tên cầu thủ"
              />
              <input
                type="text"
                value={player.position}
                onChange={(e) => handleEditPlayer(index, "position", e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Vị trí"
              />
              <input
                type="number"
                value={player.number}
                onChange={(e) => handleEditPlayer(index, "number", e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Số áo"
              />
              <input
                type="number"
                value={player.goals}
                onChange={(e) => handleEditPlayer(index, "goals", e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Số bàn thắng"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Thêm cầu thủ mới */}
      <h3 className="text-lg font-semibold mt-6">➕ Thêm cầu thủ</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <input
          type="text"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          className="p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Tên cầu thủ"
        />
        <input
          type="text"
          value={newPlayer.position}
          onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
          className="p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Vị trí"
        />
        <input
          type="number"
          value={newPlayer.number}
          onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
          className="p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Số áo"
        />
        {/* Thiết kế lại phần Link ảnh */}
        <div className="relative group">
          <input
            type="text"
            value={newPlayer.image}
            onChange={(e) => setNewPlayer({ ...newPlayer, image: e.target.value })}
            className="w-full p-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all group-hover:shadow-md"
            placeholder="Link ảnh (tùy chọn)"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-400 transition-colors">
            📷
          </span>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm italic">
            {newPlayer.image ? "Đã thêm" : "Tùy chọn"}
          </span>
        </div>
      </div>
      <button
        onClick={handleAddPlayer}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded mt-4 transition-colors"
      >
        Thêm cầu thủ
      </button>

      {error && <p className="text-red-400 text-center mt-3">{error}</p>}

      {/* Thống kê đội */}
      <h3 className="text-lg font-semibold mt-6">📊 Thống kê đội bóng</h3>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Object.keys(teamStats).map((stat) => (
            <div
              key={stat}
              className="flex flex-col items-center bg-gray-700 p-3 rounded-lg shadow-sm hover:bg-gray-600 transition-colors"
            >
              <label className="text-sm font-medium text-green-400 mb-2">
                {statLabels[stat]}
              </label>
              <input
                type="number"
                value={teamStats[stat]}
                onChange={(e) => handleEditStats(stat, e.target.value)}
                className="w-16 p-2 bg-gray-900 text-white text-center border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                min="0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePlayers;