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
    const[loading, setLoading] = useState(false);
    const [clubData, setClubData] = useState({
        image: '', // Chuỗi base64 của ảnh club
        logo: '',  // Chuỗi base64 của logo
        name: '',
        contact_person_name: '',
        location: '',
        jersey_color: ['#FFFFFF'],
        description: '',
        facebook_link: '',
        instagram_link: '',
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
                const base64String = reader.result; // Chuỗi base64 đầy đủ (bao gồm "data:image/jpeg;base64,")
                setClubData({ ...clubData, image: base64String, club_image_preview: base64String });
            };
            reader.readAsDataURL(file); // Chuyển file thành base64
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result; // Chuỗi base64 đầy đủ
                setClubData({ ...clubData, logo: base64String, club_logo_preview: base64String });
            };
            reader.readAsDataURL(file); // Chuyển file thành base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Nếu cần loại bỏ tiền tố base64 ("data:image/jpeg;base64,") trước khi lưu lên Firebase
        const cleanBase64Image = clubData.image ? clubData.image.replace(/^data:image\/[a-z]+;base64,/, '') : '';
        const cleanBase64Logo = clubData.logo ? clubData.logo.replace(/^data:image\/[a-z]+;base64,/, '') : '';

        // Tạo object dữ liệu để gửi lên API hoặc Firebase
        const dataToSend = {
            name: clubData.name,
            contact_person_name: clubData.contact_person_name,
            location: clubData.location,
            jersey_color: JSON.stringify(clubData.jersey_color),
            description: clubData.description,
            facebook_link: clubData.facebook_link,
            instagram_link: clubData.instagram_link,
            createdBy: clubData.createdBy,
            image: cleanBase64Image, // Chuỗi base64 không tiền tố
            logo: cleanBase64Logo    // Chuỗi base64 không tiền tố
        };

        try {
            console.log("Data to send: ", dataToSend);
            console.log("tokeb", localStorage.getItem('token'));
            const token = localStorage.getItem('token');
             await createTeam(dataToSend, token); // Gọi API với dữ liệu đã xử lý
        
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
                createdBy: JSON.parse(localStorage.getItem('user')).id || null
            });
        } catch (error) {
            console.error('Error creating club:', error);
            if (error.response && error.response.status === 409) {
                document.getElementById('error-message').textContent = 'You already have a team!';
                document.getElementById('error-container').style.display = 'flex';
                alert("You already have a team!");
                navigate('/manage-clubs'); // Điều hướng nếu cần
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-10 flex items-center justify-center">
            <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/10 overflow-hidden relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>

                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center mb-10 tracking-tight relative z-10">
                    Build Your Club
                </h1>

                <div id="success-container" className="hidden items-center gap-4 p-5 mb-8 bg-green-500/10 border border-green-500/30 rounded-2xl shadow-lg animate-slide-in">
                    <CheckCircleIcon className="h-7 w-7 text-green-400" id="success-svg" onClick={hideErrorContainer} />
                    <p id="success-message" className="text-green-200 font-semibold"></p>
                </div>
                <div id="error-container" className="hidden items-center gap-4 p-5 mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl shadow-lg animate-slide-in">
                    <XCircleIcon className="h-7 w-7 text-red-400" id="error-svg" onClick={hideErrorContainer} />
                    <p id="error-message" className="text-red-200 font-semibold"></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Club Image *</label>
                            <div className="relative h-56 w-full rounded-2xl border-2 border-dashed border-gray-700 bg-gray-800/30 hover:bg-gray-700/30 shadow-inner transition-all duration-500 flex items-center justify-center overflow-hidden group">
                                {clubData.club_image_preview ? (
                                    <img src={clubData.club_image_preview} alt="Club Preview" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                ) : (
                                    <span className="text-gray-400 text-sm font-medium">Drop or Click to Upload</span>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                // required
                                />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Club Logo *</label>
                            <div className="relative h-56 w-full rounded-2xl border-2 border-dashed border-gray-700 bg-gray-800/30 hover:bg-gray-700/30 shadow-inner transition-all duration-500 flex items-center justify-center overflow-hidden group">
                                {clubData.club_logo_preview ? (
                                    <img src={clubData.club_logo_preview} alt="Club Logo" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                ) : (
                                    <span className="text-gray-400 text-sm font-medium">Drop or Click to Upload</span>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleLogoChange}
                                // required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Club Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={clubData.name}
                                onChange={handleChange}
                                placeholder="Enter club name..."
                                className="w-full p-5 rounded-2xl bg-gray-800/20 border border-gray-700 text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-md transition-all duration-300"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Contact Name *</label>
                            <input
                                type="text"
                                name="contact_person_name"
                                value={clubData.contact_person_name}
                                onChange={handleChange}
                                placeholder="Enter contact name..."
                                className="w-full p-5 rounded-2xl bg-gray-800/20 border border-gray-700 text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-md transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Activity Area *</label>
                            <input
                                type="text"
                                name="location"
                                value={clubData.location}
                                onChange={handleChange}
                                placeholder="Enter activity area..."
                                className="w-full p-5 rounded-2xl bg-gray-800/20 border border-gray-700 text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-md transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    {/* Thêm hai trường mới: Facebook Link và Instagram Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Facebook Link</label>
                            <input
                                type="url"
                                name="facebook_link"
                                value={clubData.facebook_link}
                                onChange={handleChange}
                                placeholder="Enter Facebook link (e.g., https://facebook.com/yourclub)"
                                className="w-full p-5 rounded-2xl bg-gray-800/20 border border-gray-700 text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-md transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-200 tracking-wide">Instagram Link</label>
                            <input
                                type="url"
                                name="instagram_link"
                                value={clubData.instagram_link}
                                onChange={handleChange}
                                placeholder="Enter Instagram link (e.g., https://instagram.com/yourclub)"
                                className="w-full p-5 rounded-2xl bg-gray-800/20 border border-gray-700 text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-md transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <label className="text-sm font-semibold text-gray-200 tracking-wide">Jersey Colors *</label>
                        {clubData.jersey_color.map((color, index) => (
                            <div key={index} className="relative flex items-center gap-4">
                                <div
                                    className="w-full p-5 rounded-2xl bg-gray-800/20 border border-gray-700 flex items-center gap-4 cursor-pointer hover:bg-gray-700/30 shadow-md transition-all duration-300"
                                    onClick={() => {
                                        setCurrentColorIndex(index);
                                        setShowColorPicker(!showColorPicker);
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-full border-2 border-gray-600 shadow-inner" style={{ backgroundColor: color }}></div>
                                    <span className="text-gray-200 font-medium">{color}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeColor(index);
                                        }}
                                        className="ml-auto p-2 hover:bg-red-500/30 rounded-full transition-all duration-300 transform hover:scale-110"
                                    >
                                        <TrashIcon className="h-5 w-5 text-red-400" />
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
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Add Color
                        </button>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-200 tracking-wide">Club Description</label>
                        <textarea
                            name="description"
                            value={clubData.description}
                            onChange={handleChange}
                            placeholder="Enter club description..."
                            className="w-full h-40 p-5 rounded-2xl bg-gray-800/20 border border-gray-700 text-white placeholder-gray-500 focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-md transition-all duration-300 resize-y"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                    >
                        Create Club
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ClubForm;