import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toReckonTeam, updateTeam, getTeamById } from "../api/teamAPI";
import { SketchPicker } from "react-color";

const TeamDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [club, setClub] = useState(location?.state?.club || null); // Sửa typo setClubs -> setClub
    const [currentUserId, setCurrentUserId] = useState(null);
    const [activeTab, setActiveTab] = useState("about");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        club_name: club?.name || "",
        location: club?.location || "",
        jersey_color: club?.jersey_color || [],
        members: club?.members || "",
        description: club?.description || "",
        contact_person_name: club?.contact_person_name || "",
        phone: club?.phone || "",
        facebook_link: club?.facebook_link || "",
        instagram_link: club?.instagram_link || "",
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentColorIndex, setCurrentColorIndex] = useState(null);
    const colorPickerRef = useRef(null);

    const fetchTeamData = async () => {
        setLoading(true);
        try {
            const res = await getTeamById(id); // Dùng await để lấy dữ liệu
            console.log("Team data after Update: ", res);
            setClub(res);
            setEditData({
                club_name: res.name || "",
                location: res.location || "",
                jersey_color: res.jersey_color || [],
                members: res.members || "",
                description: res.description || "",
                contact_person_name: res.contact_person_name || "",
                phone: res.phone || "",
                facebook_link: res.facebook_link || "",
                instagram_link: res.instagram_link || "",
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError("Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        if (!club?._id) return; 
        setLoading(true);
        setError(null);
        try {
            const res = await toReckonTeam(club._id);
            console.log("Statistics: ", res);
            setStatistics(res);
        } catch (error) {
            console.error("Error fetching statistics: ", error);
            setError("Failed to load statistics.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        setCurrentUserId(user ? JSON.parse(user).id : null);

        if (!club) {
            fetchTeamData(); 
        } else {
            fetchStatistics(); 
            setEditData({
                club_name: club.name || "",
                location: club.location || "",
                jersey_color: club.jersey_color || [],
                members: club.members || "",
                description: club.description || "",
                contact_person_name: club.contact_person_name || "",
                phone: club.phone || "",
                facebook_link: club.facebook_link || "",
                instagram_link: club.instagram_link || "",
            });
        }
    }, [club, id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isCreator = currentUserId === club?.createdBy?._id; 

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setShowColorPicker(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleColorChange = (color) => {
        const newColors = [...editData.jersey_color];
        newColors[currentColorIndex] = color.hex;
        setEditData((prev) => ({ ...prev, jersey_color: newColors }));
    };

    const addJerseyColor = () => {
        setEditData((prev) => ({ ...prev, jersey_color: [...prev.jersey_color, "#FFFFFF"] }));
    };

    const removeJerseyColor = (index) => {
        const newColors = editData.jersey_color.filter((_, i) => i !== index);
        setEditData((prev) => ({ ...prev, jersey_color: newColors }));
    };

    const handleSave = async () => {
        console.log("Saving edited data: ", editData);
        try {
            await updateTeam(id, editData); // Dùng id từ useParams
            await fetchTeamData(); // Fetch lại dữ liệu sau khi cập nhật
        } catch (error) {
            console.error("Error saving edited data: ", error);
            setError("Failed to save changes.");
        }
        setIsModalOpen(false);
    };

    if (!club && loading) {
        return (
            <div className="p-6 text-white min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    if (!club) {
        return (
            <div className="p-6 text-white min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700">
                <p className="text-xl">Club information not found.</p>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="max-w-4xl w-full bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700">
                <div className="relative h-64 rounded-lg overflow-hidden">
                    {club.image && (
                        <img src={club.image} alt="Club" className="w-full h-full object-cover brightness-75" />
                    )}
                    {club.logo && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <img
                                src={club.logo}
                                alt="Logo"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-xl"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                        {club.name || "Club Name"}
                    </h1>
                    <p className="text-gray-300 mt-2 text-lg">
                        {club.location ? `${club.location}` : "No location available"}
                    </p>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    {[
                        { key: "about", label: "About" },
                        { key: "members", label: `Members (${club.members || 0})` },
                        { key: "stats", label: "Statistics" },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`px-6 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 ${
                                activeTab === key ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="mt-8">
                    {activeTab === "about" && (
                        <div className="space-y-6">
                            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-blue-400">About</h2>
                                    {isCreator && (
                                        <button
                                            onClick={handleEditClick}
                                            className="px-4 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105 bg-green-500 text-white hover:bg-green-600"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-4 text-gray-300">
                                    <p><strong>Club Name:</strong> {club.name || "Not available"}</p>
                                    <p><strong>Location:</strong> {club.location || "Not available"}</p>
                                    <div>
                                        <strong>Jersey Colors:</strong>
                                        {club.jersey_color && club.jersey_color.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {club.jersey_color.map((color, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <div
                                                            className="w-6 h-6 rounded-full border-2 border-gray-600"
                                                            style={{ backgroundColor: color }}
                                                        ></div>
                                                        <span>{color}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span> Not available</span>
                                        )}
                                    </div>
                                    <p><strong>Members:</strong> {club.members || "Not available"}</p>
                                    <p><strong>Description:</strong> {club.description || "Not available"}</p>
                                </div>
                            </div>
                            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-blue-400 mb-4">Contact</h2>
                                <div className="space-y-4 text-gray-300">
                                    <p><strong>Contact Person:</strong> {club.contact_person_name || "Not available"}</p>
                                    <p><strong>Phone:</strong> {club.phone || "Not available"}</p>
                                    {club.facebook_link && (
                                        <p>
                                            <strong>Facebook:</strong>{" "}
                                            <a
                                                href={club.facebook_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                {club.facebook_link}
                                            </a>
                                        </p>
                                    )}
                                    {club.instagram_link && (
                                        <p>
                                            <strong>Instagram:</strong>{" "}
                                            <a
                                                href={club.instagram_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                {club.instagram_link}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "members" && (
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-blue-400 mb-4">Members ({club.members || 0})</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {club.players && club.players.length > 0 ? (
                                    club.players.map((member, index) => (
                                        <div
                                            key={index}
                                            className="relative bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col items-center border-2 border-blue-500"
                                        >
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-24 h-24 object-cover border-4 border-white shadow-md rounded-md"
                                            />
                                            <p className="font-medium text-white mt-3 text-lg">{member.name || "Unnamed"}</p>
                                            <p className="text-gray-300 text-sm">{member.position || "No position"}</p>
                                            <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-lg shadow-md">
                                                #{member.number || "N/A"}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-300 text-center col-span-full">No members available.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "stats" && (
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-blue-400 mb-4">Statistics</h2>
                            {loading ? (
                                <p className="text-gray-300 text-center">Loading statistics...</p>
                            ) : error ? (
                                <p className="text-red-400 text-center">{error}</p>
                            ) : statistics ? (
                                <div className="grid grid-cols-2 gap-4 text-gray-300 text-lg font-semibold">
                                    {[
                                        { label: "Total Matches", value: statistics.totalMatches || 0, color: "text-blue-400" },
                                        { label: "Wins", value: statistics.wins || 0, color: "text-green-400" },
                                        { label: "Losses", value: statistics.losses || 0, color: "text-red-400" },
                                        { label: "Winning Rate", value: `${statistics.winningRate || 0}%`, color: "text-yellow-400" },
                                        { label: "Goals For", value: statistics.goalsFor || 0, color: "text-purple-400" },
                                        { label: "Goals Against", value: statistics.goalsAgainst || 0, color: "text-orange-400" },
                                    ].map(({ label, value, color }, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 p-4 rounded-lg shadow-md text-center border-2 border-gray-600 hover:border-gray-400 transition-all"
                                        >
                                            <p className={`${color} text-lg font-bold`}>{label}</p>
                                            <p className="text-white text-3xl font-extrabold">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-300 text-center">No statistics available.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal chỉnh sửa */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
                            <h2 className="text-2xl font-semibold text-white mb-4">Edit Team Details</h2>
                            <div className="space-y-4 text-gray-300">
                                {/* About */}
                                <div>
                                    <label className="block text-sm font-medium">Club Name</label>
                                    <input
                                        type="text"
                                        name="club_name"
                                        value={editData.club_name}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={editData.location}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Jersey Colors</label>
                                    {editData.jersey_color.map((color, index) => (
                                        <div key={index} className="flex items-center gap-2 mt-1 relative">
                                            <div
                                                className="w-10 h-10 rounded-md border-2 border-gray-600 cursor-pointer"
                                                style={{ backgroundColor: color }}
                                                onClick={() => {
                                                    setCurrentColorIndex(index);
                                                    setShowColorPicker(!showColorPicker);
                                                }}
                                            ></div>
                                            <span>{color}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeJerseyColor(index)}
                                                className="p-2 text-red-400 hover:text-red-500"
                                            >
                                                Remove
                                            </button>
                                            {showColorPicker && currentColorIndex === index && (
                                                <div
                                                    className="absolute z-30 mt-2 top-full left-0 shadow-2xl"
                                                    ref={colorPickerRef}
                                                >
                                                    <SketchPicker
                                                        color={color}
                                                        onChangeComplete={handleColorChange}
                                                        presetColors={[
                                                            "#FF0000",
                                                            "#00FF00",
                                                            "#0000FF",
                                                            "#FFFF00",
                                                            "#00FFFF",
                                                            "#FF00FF",
                                                            "#C0C0C0",
                                                            "#808080",
                                                            "#800000",
                                                            "#808000",
                                                            "#008000",
                                                            "#800080",
                                                            "#008080",
                                                            "#000080",
                                                            "#FFFFFF",
                                                            "#000000",
                                                        ]}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addJerseyColor}
                                        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    >
                                        Add Color
                                    </button>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Members</label>
                                    <input
                                        type="text"
                                        name="members"
                                        value={editData.members}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={editData.description}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white h-24 resize-none"
                                    />
                                </div>

                                {/* Contact */}
                                <div>
                                    <label className="block text-sm font-medium">Contact Person</label>
                                    <input
                                        type="text"
                                        name="contact_person_name"
                                        value={editData.contact_person_name}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editData.phone}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Facebook Link</label>
                                    <input
                                        type="url"
                                        name="facebook_link"
                                        value={editData.facebook_link}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Instagram Link</label>
                                    <input
                                        type="url"
                                        name="instagram_link"
                                        value={editData.instagram_link}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mt-1 rounded-md bg-gray-700 border border-gray-600 text-white"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    onClick={handleModalClose}
                                    className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamDetail;