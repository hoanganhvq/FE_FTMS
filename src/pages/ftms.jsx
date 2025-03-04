import React, { useState } from 'react';
import axios from 'axios';
import config from "../config.json";
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const NewTournamentForm = () => {
    const [formData, setFormData] = useState({
        tournament_image: null,
        tournament_name: '',
        phone_number: '',
        location: '',
        competition_format: 'Loại trực tiếp',
        number_of_teams: 4,
        number_of_members: 5
    });

    const [additionalSettings, setAdditionalSettings] = useState({
        winPoints: 3,
        drawPoints: 1,
        lossPoints: 0,
        numberOfRounds: 1, // Số lượt đá vòng tròn
        teamsAdvancing: 2, // Số đội vào vòng trong (cho bảng đấu)
    });

    const hideSuccessContainer = () => {
        const successContainer = document.getElementById('success-container');
        successContainer.style.display = 'none';
    };

    function hideErrorContainer() {
        const errorContainer = document.getElementById('error-container');
        errorContainer.style.display = 'none';
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, tournament_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const processingMessageElement = document.getElementById('processing-message');
        const processingContainer = document.getElementById('processing-container');
        processingMessageElement.textContent = 'Tournament is being processed...';
        processingContainer.style.display = 'flex';
    
        const successMessageElement = document.getElementById('success-message');
        const successContainer = document.getElementById('success-container');
    
        const formDataToSend = new FormData();
        formDataToSend.append('tournament_image', formData.tournament_image);
        formDataToSend.append('tournament_name', formData.tournament_name);
        formDataToSend.append('phone_number', formData.phone_number);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('competition_format', formData.competition_format);
        formDataToSend.append('number_of_teams', formData.number_of_teams);
    
        // Thêm dữ liệu bổ sung tùy thuộc vào hình thức thi đấu
        if (formData.competition_format === 'Đấu vòng tròn') {
            formDataToSend.append('win_points', additionalSettings.winPoints);
            formDataToSend.append('draw_points', additionalSettings.drawPoints);
            formDataToSend.append('loss_points', additionalSettings.lossPoints);
            formDataToSend.append('number_of_rounds', additionalSettings.numberOfRounds);
        } else if (formData.competition_format === 'Bảng đấu') {
            formDataToSend.append('teams_advancing', additionalSettings.teamsAdvancing);
        }
    
        try {
            await axios.post(config.apiEndpoint + '/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            processingContainer.style.display = 'none';
            successMessageElement.textContent = 'Tournament is successfully created.';
            successContainer.style.display = 'flex';
    
            const successSvg = document.getElementById('success-svg');
            successSvg.addEventListener('click', hideSuccessContainer);
    
        } catch (error) {
            console.error('Error creating tournament:', error);
            successContainer.style.display = 'none';
            const errorMessageElement = document.getElementById('error-message');
            errorMessageElement.textContent = 'An error occurred. Please try again.';
            const errorContainer = document.getElementById('error-container');
            errorContainer.style.display = 'flex';
    
            const errorSvg = document.getElementById('error-svg');
            errorSvg.addEventListener('click', hideErrorContainer);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-gray-800/90 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm transform transition-all duration-500 hover:shadow-4xl">
                {/* Header với animation */}
                <div className="bg-gradient-to-r from-sky-600 to-sky-800 p-8 animate-pulse-slow">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white/80 to-sky-200 animate-gradient">
                        Tạo Giải Đấu Mới
                    </h1>
                </div>
                
                <div className="p-8">
                    {/* Thông báo xử lý, thành công, lỗi với animation */}
                    <div id="processing-container" className="hidden bg-sky-100/80 p-4 rounded-2xl mb-6 flex items-center justify-center backdrop-blur-sm shadow-md animate-fade-in">
                        <svg className="animate-spin h-5 w-5 text-sky-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div id="processing-message" className="text-sky-700 font-semibold">Đang xử lý...</div>
                    </div>
                    <div id="success-container" className="hidden bg-green-100/80 p-4 rounded-2xl mb-6 flex items-center justify-center backdrop-blur-sm shadow-md animate-fade-in">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3" />
                        <div id="success-message" className="text-green-700 font-semibold">Tạo giải đấu thành công!</div>
                        <button id="success-svg" className="ml-3 text-green-600 hover:text-green-800 transition duration-300 transform hover:scale-105">
                            <XCircleIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div id="error-container" className="hidden bg-red-100/80 p-4 rounded-2xl mb-6 flex items-center justify-center backdrop-blur-sm shadow-md animate-fade-in">
                        <XCircleIcon className="h-5 w-5 text-red-600 mr-3" />
                        <div id="error-message" className="text-red-700 font-semibold">Có lỗi xảy ra. Vui lòng thử lại.</div>
                        <button id="error-svg" className="ml-3 text-red-600 hover:text-red-800 transition duration-300 transform hover:scale-105">
                            <XCircleIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Hình ảnh giải đấu */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Hình ảnh giải đấu</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-2xl bg-gray-900/50 backdrop-blur-sm hover:border-sky-500 transition duration-500 transform hover:scale-102">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-14 w-14 text-gray-400 animate-pulse-slow" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-gray-400">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-900/50 rounded-md font-medium text-sky-400 hover:text-sky-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500 transition duration-300">
                                            <span>Tải lên file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </label>
                                        <p className="pl-1">hoặc kéo thả</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Các trường nhập liệu */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Tên giải đấu*</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                    placeholder="Nhập tên giải đấu..."
                                    value={formData.tournament_name}
                                    onChange={(e) => setFormData({ ...formData, tournament_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Số điện thoại*</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                    placeholder="Nhập số điện thoại..."
                                    value={formData.phone_number}
                                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Địa điểm*</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                    placeholder="Nhập địa điểm..."
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Hình thức thi đấu*</label>
                                <select
                                    className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                    value={formData.competition_format}
                                    onChange={(e) => setFormData({ ...formData, competition_format: e.target.value })}
                                    required
                                >
                                    <option value="Đấu vòng tròn">Đấu vòng tròn</option>
                                    <option value="Bảng đấu">Bảng đấu</option>
                                </select>
                            </div>
                        </div>

                        {/* Các trường tùy thuộc vào hình thức thi đấu */}
                        {formData.competition_format === 'Đấu vòng tròn' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Số lượt đá vòng tròn*</label>
                                    <select
                                        className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                        value={additionalSettings.numberOfRounds}
                                        onChange={(e) => setAdditionalSettings({ ...additionalSettings, numberOfRounds: parseInt(e.target.value) || 1 })}
                                        required
                                    >
                                        <option value={1}>1 lượt</option>
                                        <option value={2}>2 lượt</option>
                                        <option value={3}>3 lượt</option>
                                        <option value={4}>4 lượt</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {formData.competition_format === 'Bảng đấu' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Số đội vào vòng trong*</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                        placeholder="Nhập số đội vào vòng trong..."
                                        value={additionalSettings.teamsAdvancing}
                                        onChange={(e) => setAdditionalSettings({ ...additionalSettings, teamsAdvancing: parseInt(e.target.value) || 2 })}
                                        min="1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Số lượt đá vòng tròn*</label>
                                    <select
                                        className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                        value={additionalSettings.numberOfRounds}
                                        onChange={(e) => setAdditionalSettings({ ...additionalSettings, numberOfRounds: parseInt(e.target.value) || 1 })}
                                        required
                                    >
                                        <option value={1}>1 lượt</option>
                                        <option value={2}>2 lượt</option>
                                        <option value={3}>3 lượt</option>
                                        <option value={4}>4 lượt</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Số đội tham gia*</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                    placeholder="Nhập số đội tham gia..."
                                    value={formData.number_of_teams}
                                    onChange={(e) => setFormData({ ...formData, number_of_teams: parseInt(e.target.value) || 0 })}
                                    min="1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2 animate-slide-in">Số lượng thành viên*</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-3 border border-gray-700 rounded-2xl shadow-md bg-gray-900/50 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-500 transform hover:scale-101 hover:border-sky-600"
                                    placeholder="Nhập số thành viên..."
                                    value={formData.number_of_members}
                                    onChange={(e) => setFormData({ ...formData, number_of_members: parseInt(e.target.value) || 0 })}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        {/* Nút submit */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white p-4 rounded-2xl font-semibold shadow-lg transition duration-500 transform hover:scale-105 hover:shadow-xl animate-pulse-slow"
                            >
                                Tạo Giải Đấu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Animation keyframes
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
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

export default NewTournamentForm;