import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import config from '../config.json';
import { CheckCircleIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { SketchPicker } from 'react-color';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for the editor

function ClubForm() {
    const [clubData, setClubData] = useState({
        club_image: null,
        club_logo: null,
        club_name: '',
        phone_number: '',
        contact_name: '',
        email: '',
        activity_area: '',
        jersey_colors: ['#FFFFFF'], // Mảng để lưu trữ các màu áo
        description: '',
    });

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const colorPickerRef = useRef(null);

    const hideErrorContainer = () => {
        const errorContainer = document.getElementById('error-container');
        const successContainer = document.getElementById('success-container');

        if (errorContainer) {
            errorContainer.style.display = 'none';
        } else if (successContainer) {
            successContainer.style.display = 'none';
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setClubData({ ...clubData, club_image: file, club_image_preview: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setClubData({ ...clubData, club_logo: file, club_logo_preview: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('club_image', clubData.club_image);
        formDataToSend.append('club_logo', clubData.club_logo);
        formDataToSend.append('club_name', clubData.club_name);
        formDataToSend.append('phone_number', clubData.phone_number);
        formDataToSend.append('contact_name', clubData.contact_name);
        formDataToSend.append('email', clubData.email);
        formDataToSend.append('activity_area', clubData.activity_area);
        formDataToSend.append('jersey_colors', JSON.stringify(clubData.jersey_colors));
        formDataToSend.append('description', clubData.description);

        try {
            await axios.post(config.clubAPI + '/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const successMessageElement = document.getElementById('success-message');
            successMessageElement.textContent = 'New club is successfully created.';

            const successContainer = document.getElementById('success-container');
            successContainer.style.display = 'flex';

            setClubData({
                club_image: null,
                club_logo: null,
                club_name: '',
                phone_number: '',
                contact_name: '',
                email: '',
                activity_area: '',
                jersey_colors: ['#FFFFFF'],
                description: '',
                club_image_preview: null,
                club_logo_preview: null,
            });

            const successSvg = document.getElementById('success-svg');
            successSvg.addEventListener('click', hideErrorContainer);

        } catch (error) {
            console.error('Error creating club:', error);
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.textContent = 'An error occurred. Please try again.';

            const errorContainer = document.getElementById('error-container');
            errorContainer.style.display = 'flex';

            const errorSvg = document.getElementById('error-svg');
            errorSvg.addEventListener('click', hideErrorContainer);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClubData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleColorChange = (color) => {
        const newColors = [...clubData.jersey_colors];
        newColors[currentColorIndex] = color.hex;
        setClubData({ ...clubData, jersey_colors: newColors });
    };

    const addColor = () => {
        setClubData({ ...clubData, jersey_colors: [...clubData.jersey_colors, '#FFFFFF'] });
    };

    const removeColor = (index) => {
        const newColors = clubData.jersey_colors.filter((_, i) => i !== index);
        setClubData({ ...clubData, jersey_colors: newColors });
    };

    const handleDescriptionChange = (value) => {
        setClubData({ ...clubData, description: value });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 p-6">
            <div className="max-w-6xl mx-auto bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-slate-700 p-8">
                    <h1 className="text-3xl font-bold text-slate-300 text-center">Tạo Đội Bóng Mới</h1>
                </div>
                <div className="p-8">
                    <div id="success-container" className="hidden bg-green-200 flex gap-2 mb-6 p-6 rounded-xl">
                        <CheckCircleIcon className="h-6 w-6 text-green-500" id="success-svg"/>
                        <div id="success-message" className="text-green-500"></div>
                    </div>
                    <div id="error-container" className="hidden transition-all bg-red-200 flex mb-6 gap-2 p-6 rounded-xl">
                        <XCircleIcon className="h-6 w-6 text-red-500" id="error-svg"/>
                        <div id="error-message" className="text-red-500"></div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Ảnh đại diện</label>
                                <div className="flex items-center justify-center w-full h-40 border-2 border-slate-600 border-dashed rounded-lg bg-slate-700 hover:bg-slate-600 transition duration-300 relative">
                                    {clubData.club_image_preview ? (
                                        <img
                                            src={clubData.club_image_preview}
                                            alt="Club Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-slate-400">Tải lên ảnh</span>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-500 mb-2">Logo đội</label>
                                <div className="flex items-center justify-center w-full h-40 border-2 border-slate-600 border-dashed rounded-lg bg-slate-700 hover:bg-slate-600 transition duration-300 relative">
                                    {clubData.club_logo_preview ? (
                                        <img
                                            src={clubData.club_logo_preview}
                                            alt="Club Logo"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="text-slate-400">Tải lên logo</span>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleLogoChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="block text-sm font-medium text-slate-500">
                                Tên đội*
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    name="club_name"
                                    placeholder="Nhập tên đội..."
                                    value={clubData.club_name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="block text-sm font-medium text-slate-500">
                                Số điện thoại*
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    name="phone_number"
                                    placeholder="Nhập số điện thoại..."
                                    value={clubData.phone_number}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="block text-sm font-medium text-slate-500">
                                Tên người liên hệ*
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    name="contact_name"
                                    placeholder="Nhập tên người liên hệ..."
                                    value={clubData.contact_name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className="block text-sm font-medium text-slate-500">
                                Địa chỉ email*
                                <input
                                    type="email"
                                    className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    name="email"
                                    placeholder="Nhập địa chỉ email..."
                                    value={clubData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>

                        <label className="block text-sm font-medium text-slate-500">
                            Khu vực hoạt động*
                            <input
                                type="text"
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                name="activity_area"
                                placeholder="Nhập khu vực hoạt động..."
                                value={clubData.activity_area}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label className="block text-sm font-medium text-slate-500">
                            Màu áo*
                            <div className="space-y-2">
                                {clubData.jersey_colors.map((color, index) => (
                                    <div key={index} className="relative">
                                        <div
                                            className="mt-1 p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 cursor-pointer flex items-center gap-2"
                                            onClick={() => {
                                                setCurrentColorIndex(index);
                                                setShowColorPicker(!showColorPicker);
                                            }}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full border border-slate-400"
                                                style={{ backgroundColor: color }}
                                            ></div>
                                            <span>{color}</span>
                                            <button
                                                type="button"
                                                className="ml-auto p-1 rounded-full hover:bg-slate-600 transition duration-300"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeColor(index);
                                                }}
                                            >
                                                <TrashIcon className="h-5 w-5 text-red-500" />
                                            </button>
                                        </div>
                                        {showColorPicker && currentColorIndex === index && (
                                            <div className="absolute z-10 mt-2" ref={colorPickerRef}>
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
                                    className="mt-2 bg-sky-500 hover:bg-sky-600 text-slate-900 p-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                                    onClick={addColor}
                                >
                                    Thêm màu áo
                                </button>
                            </div>
                        </label>

                        <label className="block text-sm font-medium text-slate-500">
                            Giới thiệu đội
                            <ReactQuill
                                theme="snow"
                                value={clubData.description}
                                onChange={handleDescriptionChange}
                                className="bg-slate-700 text-slate-300 rounded-lg mt-1"
                                placeholder="Nhập giới thiệu đội..."
                                style={{ backgroundColor: '#1E293B', color: '#F1F5F9' }}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['link', 'image'],
                                        ['clean']
                                    ],
                                }}
                            />
                        </label>

                        <button
                            className="w-full bg-sky-500 hover:bg-sky-700 px-6 py-3 text-lg leading-6 rounded-full font-semibold text-slate-900 transition duration-300 transform hover:scale-105"
                            type="submit"
                        >
                            Tạo Đội
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ClubForm;