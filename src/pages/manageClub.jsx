import React from "react";
import { getTeamByUserId, addPlayerIntoTeam } from "../api/teamAPI";
import { deletePlayer, updatePlayer } from "../api/playerAPI";
import LoadingScreen from "./loadingScreen";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagePlayers = () => {
  const navigate = useNavigate();
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    number: "",
    avatar: "",
    goals: 0,
  });
  const [error, setError] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPlayer, setEditedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  const [loading, setLoading] = useState(false);
  const[team, setTeam] = useState(null);
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);
      const res = await getTeamByUserId(token);
      if(!res){
        setPlayers([]);
        return;
      }      
      setTeam(res[0]);
      setPlayers(res[0].players);
    } catch (error) {
      console.error("Error fetching players: ", error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPlayers();
  }, []);


  const handleAddPlayer = async () => {
    if (!newPlayer.name || !newPlayer.position || !newPlayer.number) {
      setError(" Please fill in all required fields!");
      return;
    }
    const numberAsInt = parseInt(newPlayer.number, 10);
    if (players.some((player) => parseInt(player.number, 10) === numberAsInt)) {
      setError(" Jersey number already exists!");
      return;
    }

    try {
      const teamId = team._id;// Giả sử teamId nằm trong res[0]._id
      const playerData = { ...newPlayer, number: numberAsInt };
      console.log("Player data to add: ", playerData);
      console.log("Team ID: ", teamId);
            
      await addPlayerIntoTeam(teamId, playerData); // Gọi API để thêm player
      await fetchPlayers(); // Lấy lại danh sách players từ server
      setNewPlayer({ name: "", position: "", number: "", avatar: "", goals: 0 });
      setError("");
    } catch (error) {
      console.error("Error adding player: ", error);
      setError(" Failed to add player. Please try again.");
    }
  };

  const handleEditPlayer = (index, field, value) => {
    setEditedPlayer({
      ...editedPlayer,
      [field]: field === "number" ? parseInt(value, 10) : value,
    });
  };

  const handleDeletePlayer = async (index) => {
    try {
      const playerId = players[index]._id;
      await deletePlayer(playerId); // Gọi API để xóa player
      await fetchPlayers(); // Lấy lại danh sách players từ server
    } catch (error) {
      console.error("Error deleting player: ", error);
      setError(" Failed to delete player. Please try again.");
    }
  };

  const handleInputChange = (e, field) => {
    const value = field === "number" ? e.target.value : e.target.value;
    setNewPlayer({ ...newPlayer, [field]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPlayer({ ...newPlayer, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewPlayer({ ...newPlayer, avatar: "" });
  };

  const startEditing = (index) => {
    if (!players[index]) {
      setError(" Invalid player data!");
      return;
    }
    setEditingIndex(index);
    setEditedPlayer({ ...players[index] });
  };

  const saveEdit = async (index) => {
    if (!editedPlayer) {
      setError(" No player data to save!");
      return;
    }
    if (!editedPlayer.name || !editedPlayer.position || !editedPlayer.number) {
      setError(" Please fill in all required fields!");
      return;
    }
    const numberAsInt = parseInt(editedPlayer.number, 10);
    if (
      players.some(
        (player, i) =>
          parseInt(player.number, 10) === numberAsInt && i !== index
      )
    ) {
      setError(" Jersey number already exists!");
      return;
    }

    try {
      const { _id, __v, ...dataToUpdate } = editedPlayer; // Loại bỏ _id và __v
      const token = localStorage.getItem("token");
      console.log("Data to update: ", { ...dataToUpdate, number: numberAsInt });
      await updatePlayer(_id, { ...dataToUpdate, number: numberAsInt }); // Gọi API để cập nhật
      await fetchPlayers(); // Lấy lại danh sách players từ server
      setEditingIndex(null);
      setEditedPlayer(null);
      setError("");
    } catch (error) {
      console.error("Error updating player: ", error);
      setError("⚠️ Failed to update player. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedPlayer(null);
    setError("");
  };

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }
  if (!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold mb-6">You have no team</h2>
          <p className="text-gray-400 text-lg mb-8">
            It looks like you haven’t created a team yet. Start by creating one!
          </p>
          <button
            onClick={() => navigate("/new-club")} // Navigate to create club page
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Create Your Club
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700">
        <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg mb-10">
          {team.name}
          {/* Manage Your Team */}
        </h1>

        {/* Player List */}
        <h2 className="text-3xl font-semibold text-gray-300 mb-8">📋 Player List</h2>
        {players.length === 0 ? (
          <p className="text-gray-300 text-center text-lg">No players added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600"
              >
                <div className="relative flex justify-center mb-4">
                  <img
                    src={player.avatar || "https://via.placeholder.com/100"}
                    alt={player.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-600 shadow-inner"
                  />
                  <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
                    {player.position || "N/A"}
                  </span>
                  {editingIndex === index && (
                    <button
                      onClick={() => handleDeletePlayer(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                      aria-label={`Delete ${player.name}`}
                    >
                      ❌
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedPlayer.name}
                        onChange={(e) => handleEditPlayer(index, "name", e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        placeholder="Player Name"
                      />
                      <select
                        value={editedPlayer.position}
                        onChange={(e) => handleEditPlayer(index, "position", e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      >
                        <option value="" disabled>
                          Select Position
                        </option>
                        {positions.map((pos) => (
                          <option key={pos} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={editedPlayer.number}
                        onChange={(e) => handleEditPlayer(index, "number", e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        placeholder="Jersey Number"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        value={player.name}
                        disabled
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all opacity-75 text-sm"
                        placeholder="Player Name"
                      />
                      <input
                        type="number"
                        value={player.number}
                        disabled
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all opacity-75 text-sm"
                        placeholder="Jersey Number"
                      />
                    </>
                  )}
                </div>
                <div className="mt-4 flex justify-between gap-3">
                  {editingIndex === index ? (
                    <>
                      <button
                        onClick={() => saveEdit(index)}
                        className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all duration-300 text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-md transition-all duration-300 text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(index)}
                      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Player */}
        <h3 className="text-2xl font-semibold text-gray-300 mt-12 mb-6">➕ Add New Player</h3>
        <div className="bg-gray-700 p-8 rounded-xl border border-gray-600 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              value={newPlayer.name}
              onChange={(e) => handleInputChange(e, "name")}
              className="p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Player Name *"
            />
            <select
              value={newPlayer.position}
              onChange={(e) => handleInputChange(e, "position")}
              className="p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="" disabled>
                Select Position *
              </option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={newPlayer.number}
              onChange={(e) => handleInputChange(e, "number")}
              className="p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              placeholder="Jersey Number *"
            />
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-4 pl-14 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all group-hover:border-blue-400"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-blue-500/20 p-2 rounded-full text-gray-300 group-hover:text-blue-400 transition-all">
                📷
              </span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm italic group-hover:text-blue-300 transition-all">
                {newPlayer.avatar ? "Image Selected" : "Upload Image (optional)"}
              </span>
            </div>
          </div>

          {/* Image Preview */}
          {newPlayer.avatar && (
            <div className="mt-6 flex justify-center relative">
              <img
                src={newPlayer.avatar}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                aria-label="Remove Image"
              >
                ❌
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleAddPlayer}
          className="w-full mt-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Add Player
        </button>

        {error && (
          <p className="text-red-400 text-center mt-6 bg-red-500/10 p-4 rounded-lg border border-red-500/30">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ManagePlayers;