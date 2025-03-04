import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "../components/table";
import Matches from "../components/matches";
import Groups from "../components/groups";
import config from "../config.json"
import { TrophyIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/20/solid";
import TournamentCardSkeleton from "../components/TournamentSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
const ClubsDetailsSkeleton = () => {
    return (
        <div>
            <div className="w-80 grid content-center">
                <div
                    className="grid animate-pulse content-center grid-rows-1 pb-0 grid-cols-1 p-3 bg-slate-900 gap-3 border-1 text-slate-300">

                    <div className="bg-slate-950 grid gap-2 grid-cols-4 hover:bg-slate-900
                            hover:ring-1 hover:shadow-sky-500 hover:drop-shadow-xl ring-blue-800 transition-all ease-out
                             duration-500 p-6 pr-2 rounded-xl drop-shadow-lg shadow-sky-500"><SparklesIcon
                            className="absolute w-28 h-28 ml-44 m-2 opacity-10" />

                        <div className="p-1 pt-0 pb-1 font-semibold text-md text-sky-500  col-span-3">
                            <div
                                className="font-medium text-[10px] font-sans text-slate-400 ">TÊN CÂU LẠC BỘ
                            </div>
                            <div className="h-4 mt-2 opacity-60 -mb-2 w-[6.5rem] bg-sky-700 rounded"></div>

                        </div>
                        <div className="grid justify-self-start mt-1 p-1 -ml-5">
                            <div className="rounded-full bg-slate-700 h-9 w-9"></div>
                        </div>

                        <div className="p-1 pt-0 pb-1 font-semibold text-xs text-sky-500 col-span-2 ">
                            <div className="font-medium
                                text-[10px] font-sans text-slate-400">ĐỘI TRƯỞNG
                            </div>
                            <div className="h-3.5 opacity-60 w-[5.4rem] mt-0.5 bg-sky-700 rounded"></div>
                        </div>

                        <div className="p-1 pt-0 pb-1 font-semibold text-xs text-sky-500 col-span-2 ">
                            <div className="font-medium
                                text-[10px] font-sans text-slate-400">SỐ ĐIỆN THOẠI
                            </div>
                            <div className="h-3.5 opacity-60 w-[5.4rem] mt-0.5 bg-sky-700 rounded"></div>
                        </div>

                        <div className="p-1 pt-0 pb-1 font-semibold text-xs text-sky-500 col-span-2 ">
                            <div className="font-medium
                                text-[10px] font-sans text-slate-400">ĐỊA CHỈ
                            </div>
                            <div className="h-3.5 opacity-60 w-[5.4rem] mt-0.5 bg-sky-700 rounded"></div>
                        </div>

                        <div className="p-1 pt-0 pb-1 font-semibold text-xs text-sky-500 col-span-2 ">
                            <div className="font-medium
                                text-[10px] font-sans text-slate-400">NĂM THÀNH LÂPj
                            </div>
                            <div className="h-3.5 opacity-60 w-[5.4rem] mt-0.5 bg-sky-700 rounded"></div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};


const ClubsDetails = () => {
    const navigate = useNavigate();
    const clubs = [
        {
            "pk": 1,
            "club_name": "FC Du Lịch",
            "club_logo": "https://source.unsplash.com/100x100/?logo,soccer",
            "club_image": "https://source.unsplash.com/400x300/?football,team",
            "address": "Sân bóng C500, Hà Đông, Hà Nội",
            "person_contact": "Phan Hoang Anh",
            "email": "phananhvq223@gmail.com",
            "stadium": "Sân C500",
            "jersey_color": "Xanh - Trắng",
            "coach": "Nguyễn Văn Long",
            "captain_name": "Nguyễn Hoàng",
            "staff": ["Trợ lý HLV: Trần Minh", "HLV thể lực: Bùi Đức"],
            "phone_number": "0987654321",
            "founded_year": 2012,
            "achievements": [
                { "award": "🏆 Vô địch giải HPL-S7", "year": 2020 },
                { "award": "🥈 Á quân giải Ngoại Hạng Phủi", "year": 2021 }
            ],
            "number_member": 20,
            "members": [
                { "name": "Nguyễn Hoàng", "position": "Tiền đạo", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Trần Đức", "position": "Tiền vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Bùi Văn", "position": "Hậu vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Lê Mạnh", "position": "Thủ môn", "image": "https://source.unsplash.com/100x100/?person,face" }
            ],
            "statistics": {
                "matches_played": 120,
                "wins": 80,
                "losses": 30,
                "draws": 10,
                "goals_scored": 250,
                "goals_conceded": 120,
                "own_goals": 5,
                "top_scorer": "Nguyễn Hoàng (50 bàn)"
            },
            "social_media": {
                "facebook": "https://facebook.com/fc.dulich",
                "website": "https://fc-dulich.vn"
            }
        },
        {
            "pk": 2,
            "club_name": "EOC FC",
            "club_logo": "https://source.unsplash.com/100x100/?logo,football",
            "club_image": "https://source.unsplash.com/400x300/?soccer,team",
            "address": "Sân bóng Hoàng Mai, Hà Nội",
            "stadium": "Sân Hoàng Mai",
            "jersey_color": "Đỏ - Đen",
            "coach": "Phạm Quang Minh",
            "captain_name": "Ngô Hoàng Anh",
            "staff": ["Trợ lý HLV: Vũ Minh", "HLV thể lực: Đặng Quốc"],
            "phone_number": "0912345678",
            "founded_year": 2015,
            "achievements": [
                { "award": "🏆 Vô địch giải HPL-S6", "year": 2019 },
                { "award": "🥉 Hạng ba giải HPL-S8", "year": 2022 }
            ],
            "members": [
                { "name": "Phan Văn Tài", "position": "Tiền đạo", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Ngô Hoàng Anh", "position": "Tiền vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Đặng Quốc", "position": "Hậu vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Lê Văn Tùng", "position": "Thủ môn", "image": "https://source.unsplash.com/100x100/?person,face" }
            ],
            "statistics": {
                "matches_played": 90,
                "wins": 60,
                "losses": 20,
                "draws": 10,
                "goals_scored": 180,
                "goals_conceded": 90,
                "own_goals": 3,
                "top_scorer": "Phan Văn Tài (35 bàn)"
            },
            "social_media": {
                "facebook": "https://facebook.com/eocfc",
                "website": "https://eocfc.vn"
            }
        },
        {
            "pk": 3,
            "club_name": "Phoenix FC",
            "club_logo": "https://source.unsplash.com/100x100/?logo,sport",
            "club_image": "https://source.unsplash.com/400x300/?team,soccer",
            "address": "Sân bóng Gia Lâm, Hà Nội",
            "stadium": "Sân Gia Lâm",
            "jersey_color": "Vàng - Đen",
            "coach": "Trần Hoàng",
            "captain_name": "Võ Minh",
            "staff": ["Trợ lý HLV: Nguyễn Thanh", "HLV thể lực: Trần Hải"],
            "phone_number": "0965341234",
            "founded_year": 2018,
            "achievements": [
                { "award": "🥇 Vô địch giải Phủi Open", "year": 2021 }
            ],
            "members": [
                { "name": "Võ Minh", "position": "Tiền vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Lê Phúc", "position": "Tiền đạo", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Phạm Hải", "position": "Hậu vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Trịnh Hòa", "position": "Thủ môn", "image": "https://source.unsplash.com/100x100/?person,face" }
            ],
            "statistics": {
                "matches_played": 75,
                "wins": 50,
                "losses": 15,
                "draws": 10,
                "goals_scored": 140,
                "goals_conceded": 70,
                "own_goals": 2,
                "top_scorer": "Lê Phúc (28 bàn)"
            },
            "social_media": {
                "facebook": "https://facebook.com/phoenixfc",
                "website": "https://phoenixfc.vn"
            }
        },
        {
            "pk": 4,
            "club_name": "Ocean FC",
            "club_logo": "https://source.unsplash.com/100x100/?logo,ocean",
            "club_image": "https://source.unsplash.com/400x300/?team,football",
            "address": "Sân bóng Mỹ Đình, Hà Nội",
            "stadium": "Sân Mỹ Đình",
            "jersey_color": "Xanh Dương - Trắng",
            "coach": "Đỗ Quang Huy",
            "captain_name": "Lý Tuấn",
            "staff": ["Trợ lý HLV: Hà Văn", "HLV thể lực: Trần Dũng"],
            "phone_number": "0987112233",
            "founded_year": 2010,
            "achievements": [
                { "award": "🏆 Vô địch giải HPL-S4", "year": 2018 }
            ],
            "members": [
                { "name": "Lý Tuấn", "position": "Tiền vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Đặng Minh", "position": "Tiền đạo", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Nguyễn Sơn", "position": "Hậu vệ", "image": "https://source.unsplash.com/100x100/?person,face" },
                { "name": "Phạm Lâm", "position": "Thủ môn", "image": "https://source.unsplash.com/100x100/?person,face" }
            ],
            "statistics": {
                "matches_played": 130,
                "wins": 85,
                "losses": 25,
                "draws": 20,
                "goals_scored": 280,
                "goals_conceded": 130,
                "own_goals": 4,
                "top_scorer": "Đặng Minh (60 bàn)"
            },
            "social_media": {
                "facebook": "https://facebook.com/oceanfc",
                "website": "https://oceanfc.vn"
            }
        }
    ];

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Simulate loading with a delay
    //     const loadingTimeout = setTimeout(() => {
    //         axios.get(config.clubAPI)
    //             .then(response => {
    //                 setClubs(response.data);
    //                 setLoading(false); // Set loading to false after data is fetched
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching clubs data:', error);
    //                 setError('Error fetching clubs. Please try again later.', error);
    //                 setLoading(false); // Set loading to false in case of an error
    //             });
    //     }, 0); // Simulate a 2-second loading delay

    //     return () => {
    //         clearTimeout(loadingTimeout); // Clear the loading timeout when the component unmounts
    //     };
    // }, []);

    if (error) {
        if (error) {
            return (
                <div>
                    <div
                        className="bg-slate-700 text-[15px] mb-7 gap-2 p-2 flex drop-shadow-xl place-items-center place-content-center font-semibold text-slate-300">
                        <div
                            className="bg-sky-400 px-3 text-[12px] drop-shadow-lg font-bold text-slate-900 rounded-xl">ALL
                            CLUBS
                        </div>
                    </div>
                    <div className="bg-slate-900 grid grid-rows-1 text-slate-300">
                        <div className="grid justify-center m-3">
                            <div id="error-container" className="transition-all bg-red-200 flex gap-2 p-6  rounded-xl">
                                <XCircleIcon className="h-6 w-6 text-red-500" id="error-svg" />
                                <div id="error-message" className="text-red-500">{error}</div>
                            </div>
                            <div className="grid justify-center">
                                <ClubsDetailsSkeleton />
                                <ClubsDetailsSkeleton />
                                <ClubsDetailsSkeleton />
                                <ClubsDetailsSkeleton />
                                <ClubsDetailsSkeleton />
                            </div>

                        </div>
                    </div>


                </div>
            );
        }
    }

    if (loading) {
        return (
            <div>
                <div
                    className="bg-slate-700 text-[15px] mb-7 gap-2 p-2 flex drop-shadow-xl place-items-center place-content-center font-semibold text-slate-300">
                    <div className="bg-sky-400 px-3 text-[12px] drop-shadow-lg font-bold text-slate-900 rounded-xl">ALL
                        CLUBS
                    </div>
                </div>
                <div className="bg-slate-900 grid justify-center ">
                    <ClubsDetailsSkeleton />
                    <ClubsDetailsSkeleton />
                    <ClubsDetailsSkeleton />
                    <ClubsDetailsSkeleton />
                    <ClubsDetailsSkeleton />
                </div>
            </div>

        );
    }

    if (clubs.length === 0) {
        return <div>No clubs found.</div>;
    }

    const handleNavigate = (Club) => {
        navigate({
            pathname: `/club/${Club.pk}`,}, {state: {Club}})
    }
    // const handleGet = club => {
    //     try {
    //         // await axios.delete(apiEndpoint + "/" + post.id);
    //         const club_id = clubs.filter(t => t.id === club.id);
    //         axios.get(config.apiEndpoint + club.id + '/groups')
    //             .then(response => {
    //                 setClubs(response.data);
    //             })

    //         setClubs(club_id)

    //     } catch (ex) {
    //         if (ex.response && ex.response.status === 404)
    //             alert("Can't get the tournament.");

    //     }
    // }
    return (
        <div className="flex flex-col items-center p-8 bg-gray-900 min-h-screen">
            {/* Header */}
            <div className="relative w-full max-w-4xl flex items-center justify-center bg-gradient-to-r from-sky-600 to-blue-500 text-white py-4 px-6 rounded-xl shadow-xl mb-8">
                <SparklesIcon className="w-7 h-7 text-white mr-3 animate-pulse" />
                <span className="text-xl font-extrabold tracking-wide uppercase">Danh Sách Các Câu Lạc Bộ</span>
            </div>

            {/* Club Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl">
                {clubs.map((club) => (
                    <div
                        key={club.pk}
                        onClick={() => handleNavigate(club)}
                        className="bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    >
                        {/* Club Header */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={club.club_image}
                                className="w-20 h-20 rounded-md shadow-md"
                                alt="CLB"
                            />
                            <div>
                                <div className="text-xs text-gray-400 uppercase">Tên Câu Lạc Bộ</div>
                                <div className="text-md font-semibold text-blue-400">{club.club_name}</div>
                            </div>
                        </div>

                        {/* Club Info */}
                        <div className="mt-4 text-xs text-blue-300 space-y-2">
                            <div>
                                <div className="text-gray-400 uppercase">Đội Trưởng</div>
                                <div className="font-medium">{club.captain_name}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 uppercase">Số Điện Thoại</div>
                                <div className="font-medium">{club.phone_number}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 uppercase">Năm Thành Lập</div>
                                <div className="font-medium">{club.founded_year}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 uppercase">Địa Chỉ</div>
                                <div className="font-medium">{club.address}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubsDetails;
