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
        <div className="bg-slate-900 min-h-screen p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-slate-700 p-8">
                    <h1 className="text-3xl font-bold text-slate-300 text-center">Tạo Giải Đấu Mới</h1>
                </div>
                <div className="p-8">
                    <div id="processing-container" className="hidden bg-blue-100 p-4 rounded-lg mb-6 flex items-center">
                        <svg className="animate-spin h-5 w-5 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <div id="processing-message" className="text-blue-700">Đang xử lý...</div>
                    </div>
                    <div id="success-container" className="hidden bg-green-100 p-4 rounded-lg mb-6 flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3" />
                        <div id="success-message" className="text-green-700">Tạo giải đấu thành công!</div>
                    </div>
                    <div id="error-container" className="hidden bg-red-100 p-4 rounded-lg mb-6 flex items-center">
                        <XCircleIcon className="h-5 w-5 text-red-500 mr-3" />
                        <div id="error-message" className="text-red-700">Có lỗi xảy ra. Vui lòng thử lại.</div>
                    </div>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Hình ảnh giải đấu</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-lg bg-slate-700">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="flex text-sm text-slate-400">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-slate-700 rounded-md font-medium text-sky-500 hover:text-sky-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                            <span>Tải lên một file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </label>
                                        <p className="pl-1 text-slate-300">hoặc kéo thả</p>
                                    </div>
                                    <p className="text-xs text-slate-400">PNG, JPG, GIF tối đa 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Tên giải đấu*</label>
                            <input
                                type="text"
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="Nhập tên giải đấu..."
                                value={formData.tournament_name}
                                onChange={(e) => setFormData({ ...formData, tournament_name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Số điện thoại*</label>
                            <input
                                type="text"
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="Nhập số điện thoại..."
                                value={formData.phone_number}
                                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Địa điểm*</label>
                            <input
                                type="text"
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="Nhập địa điểm..."
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Hình thức thi đấu*</label>
                            <select
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                value={formData.competition_format}
                                onChange={(e) => setFormData({ ...formData, competition_format: e.target.value })}
                                required
                            >
                                <option value="Loại trực tiếp">Loại trực tiếp</option>
                                <option value="Đấu vòng tròn">Đấu vòng tròn</option>
                                <option value="Bảng đấu">Bảng đấu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Số đội tham gia*</label>
                            <input
                                type="number"
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="Nhập số đội tham gia..."
                                value={formData.number_of_teams}
                                onChange={(e) => setFormData({ ...formData, number_of_teams: parseInt(e.target.value) || 0 })}
                                min="1"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Số lượng thành viên</label>
                            <input
                                type="number"
                                className="mt-1 block w-full p-3 border border-slate-600 rounded-lg shadow-sm bg-slate-700 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                placeholder="Nhập số đội thành viên..."
                                value={formData.number_of_members}
                                onChange={(e) => setFormData({ ...formData, number_of_members: parseInt(e.target.value) || 0 })}
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-sky-500 hover:bg-sky-600 text-slate-900 p-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
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

export default NewTournamentForm;