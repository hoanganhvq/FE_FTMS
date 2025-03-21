import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import config from '../config.json';
import { CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { SketchPicker } from 'react-color';
import { createTeam } from '../api/teamAPI';
import { useNavigate } from "react-router-dom";
import LoadingScreen from './loadingScreen';

function ClubForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [clubData, setClubData] = useState({
        image: '',
        logo: '',
        name: '',
        contact_person_name: '',
        location: '',
        jersey_color: ['#FFFFFF'],
        description: '',
        facebook_link: '',
        instagram_link: '',
        members: 0,
        phone: '',
        club_image_preview: null,
        club_logo_preview: null,
        createdBy: JSON.parse(localStorage.getItem('user')).id || null
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const colorPickerRef = useRef(null);

    const hideErrorContainer = () => {
        const errorContainer = document.getElementById('error-container');
        const successContainer = document.getElementById('success-container');
        if (errorContainer) errorContainer.style.display = 'none';
        if (successContainer) successContainer.style.display = 'none';
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setClubData({ ...clubData, image: base64String, club_image_preview: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setClubData({ ...clubData, logo: base64String, club_logo_preview: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanBase64Image = clubData.image ? clubData.image.replace(/^data:image\/[a-z]+;base64,/, '') : '';
        const cleanBase64Logo = clubData.logo ? clubData.logo.replace(/^data:image\/[a-z]+;base64,/, '') : '';

        const dataToSend = {
            name: clubData.name,
            contact_person_name: clubData.contact_person_name,
            location: clubData.location,
            jersey_color: clubData.jersey_color,
            description: clubData.description,
            facebook_link: clubData.facebook_link,
            instagram_link: clubData.instagram_link,
            createdBy: clubData.createdBy,
            image: cleanBase64Image,
            logo: cleanBase64Logo,
            members: 0,
            phone: clubData.phone,
        };

        try {
            console.log("Data to send: ", dataToSend);
            const token = localStorage.getItem('token');
            await createTeam(dataToSend, token);

            document.getElementById('success-message').textContent = 'New club is successfully created.';
            document.getElementById('success-container').style.display = 'flex';
            setClubData({
                image: '',
                logo: '',
                name: '',
                contact_person_name: '',
                location: '',
                jersey_color: ['#FFFFFF'],
                description: '',
                facebook_link: '',
                instagram_link: '',
                club_image_preview: null,
                club_logo_preview: null,
                members: 0,
                phone: '',
                createdBy: JSON.parse(localStorage.getItem('user')).id || null
            });
        } catch (error) {
            console.error('Error creating club:', error);
            if (error.response && error.response.status === 409) {
                document.getElementById('error-message').textContent = 'You already have a team!';
                document.getElementById('error-container').style.display = 'flex';
                alert("You already have a team!");
                navigate('/manage-clubs');
            } else {
                document.getElementById('error-message').textContent =
                    error.response?.data?.message || 'An error occurred. Please try again.';
                document.getElementById('error-container').style.display = 'flex';
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClubData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleColorChange = (color) => {
        const newColors = [...clubData.jersey_color];
        newColors[currentColorIndex] = color.hex;
        setClubData({ ...clubData, jersey_color: newColors });
    };

    const addColor = () => {
        setClubData({ ...clubData, jersey_color: [...clubData.jersey_color, '#FFFFFF'] });
    };

    const removeColor = (index) => {
        const newColors = clubData.jersey_color.filter((_, i) => i !== index);
        setClubData({ ...clubData, jersey_color: newColors });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700">
                <h1 className="text-5xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
                    Build Your Club
                </h1>

                <div id="success-container" className="hidden items-center gap-4 p-6 mb-8 bg-green-500/10 border border-green-500/30 rounded-lg shadow-md">
                    <CheckCircleIcon className="h-8 w-8 text-green-400" id="success-svg" onClick={hideErrorContainer} />
                    <p id="success-message" className="text-green-300 text-lg font-semibold"></p>
                </div>
                <div id="error-container" className="hidden items-center gap-4 p-6 mb-8 bg-red-500/10 border border-red-500/30 rounded-lg shadow-md">
                    <XCircleIcon className="h-8 w-8 text-red-400" id="error-svg" onClick={hideErrorContainer} />
                    <p id="error-message" className="text-red-300 text-lg font-semibold"></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Club Image *</label>
                            <div className="relative h-64 w-full rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 shadow-inner transition-all duration-300 flex items-center justify-center overflow-hidden group">
                                {clubData.club_image_preview ? (
                                    <img src={clubData.club_image_preview} alt="Club Preview" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                ) : (
                                    <span className="text-gray-400 text-lg font-medium">Drop or Click to Upload</span>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Club Logo *</label>
                            <div className="relative h-64 w-full rounded-lg border-2 border-dashed border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 shadow-inner transition-all duration-300 flex items-center justify-center overflow-hidden group">
                                {clubData.club_logo_preview ? (
                                    <img src={clubData.club_logo_preview} alt="Club Logo" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                ) : (
                                    <span className="text-gray-400 text-lg font-medium">Drop or Click to Upload</span>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleLogoChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Club Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={clubData.name}
                                onChange={handleChange}
                                placeholder="Enter club name..."
                                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Contact Name *</label>
                            <input
                                type="text"
                                name="contact_person_name"
                                value={clubData.contact_person_name}
                                onChange={handleChange}
                                placeholder="Enter contact name..."
                                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Activity Area *</label>
                            <input
                                type="text"
                                name="location"
                                value={clubData.location}
                                onChange={handleChange}
                                placeholder="Enter activity area..."
                                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Phone *</label>
                            <input
                                type='text'
                                name="phone"
                                value={clubData.phone}
                                onChange={handleChange}
                                placeholder="Enter number phone..."
                                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Facebook Link</label>
                            <input
                                type="url"
                                name="facebook_link"
                                value={clubData.facebook_link}
                                onChange={handleChange}
                                placeholder="Enter Facebook link..."
                                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-base font-semibold text-gray-300">Instagram Link</label>
                            <input
                                type="url"
                                name="instagram_link"
                                value={clubData.instagram_link}
                                onChange={handleChange}
                                placeholder="Enter Instagram link..."
                                className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <label className="text-base font-semibold text-gray-300">Jersey Colors *</label>
                        {clubData.jersey_color.map((color, index) => (
                            <div key={index} className="relative flex items-center gap-4">
                                <div
                                    className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 flex items-center gap-4 cursor-pointer hover:bg-gray-600 transition-all duration-300"
                                    onClick={() => {
                                        setCurrentColorIndex(index);
                                        setShowColorPicker(!showColorPicker);
                                    }}
                                >
                                    <div className="w-8 h-8 rounded-full border-2 border-gray-600 shadow-inner" style={{ backgroundColor: color }}></div>
                                    <span className="text-gray-300 font-medium">{color}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeColor(index);
                                        }}
                                        className="ml-auto p-2 hover:bg-red-500/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                    >
                                        <TrashIcon className="h-6 w-6 text-red-400" />
                                    </button>
                                </div>
                                {showColorPicker && currentColorIndex === index && (
                                    <div className="absolute z-30 mt-2 top-full left-0 shadow-2xl" ref={colorPickerRef}>
                                        <SketchPicker
                                            color={color}
                                            onChangeComplete={handleColorChange}
                                            presetColors={[
                                                '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF',
                                                '#C0C0C0', '#808080', '#800000', '#808000', '#008000', '#800080',
                                                '#008080', '#000080', '#FFFFFF', '#000000'
                                            ]}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addColor}
                            className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                            Add Color
                        </button>
                    </div>

                    <div className="space-y-4">
                        <label className="text-base font-semibold text-gray-300">Club Description</label>
                        <textarea
                            name="description"
                            value={clubData.description}
                            onChange={handleChange}
                            placeholder="Enter club description..."
                            className="w-full h-40 p-4 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-y"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                        Create Club
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ClubForm;