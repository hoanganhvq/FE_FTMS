import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Group from "./groupsByTournamentId";
import config from "../config.json"
import { ChevronDoubleLeftIcon, TrophyIcon, XCircleIcon } from "@heroicons/react/24/solid";
import GetGroups from "./gettingGroupTabs";
import TournamentCardSkeleton from "./TournamentSkeleton";
import { ChevronDoubleRightIcon, ExclamationCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import RoundOf16 from "./roundOf16";
import QuarterFinals from "./quarterFinals";
import { Fi } from "react-flags-select";
import Final from "./final";
import { Link } from "react-router-dom";
import DevelopmentWarning from "./DevelopmentWarning";

const TournamentLabel = ({ selectedTournament }) => {
    return (
        <div
            className="bg-slate-700  text-[15px] mb-7 gap-2 p-2 flex drop-shadow-xl place-items-center place-content-center font-semibold text-slate-300">
            {!selectedTournament ?
                <div className="bg-sky-400 px-3 text-[12px] drop-shadow-lg
                    font-bold text-slate-900 rounded-xl">TOURNAMENTS</div> :
                <div className="flex gap-2 ">
                    <div className="font-semibold text-[12px]">
                        {selectedTournament.tournament_name.toUpperCase()}
                    </div>
                    <div
                        className="bg-rose-300 px-2 text-[10px] grid place-content-center place-self-center drop-shadow-lg font-bold text-slate-900 rounded-xl">
                        GROUP-STAGES
                    </div>
                </div>
            }
        </div>
    );
}
const TournamentDetails = () => {
    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([
        {
            id: 1,
            tournament_name: "Champions League",
            tournament_type_display: "Knockout",
            teams_selection_display: "16 Teams",
            current_stage_display: "Quarter Finals",
            status: "active",
            tournament_image: "https://upload.wikimedia.org/wikipedia/en/2/2e/UEFA_Champions_League_logo_2.svg",
            location: "Europe",
            date: "March 12, 2025",
            tournament_format: "Knockout",
            champion: {
                club_name: "Real Madrid",
                club_image: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
            }
        },
        {
            id: 2,
            tournament_name: "Europa League",
            tournament_type_display: "Group Stage",
            teams_selection_display: "32 Teams",
            current_stage_display: "Group Stage",
            status: "registering",
            tournament_image: "https://upload.wikimedia.org/wikipedia/en/0/03/UEFA_Europa_League.svg",
            location: "Europe",
            date: "April 5, 2025",
            tournament_format: "Group Stage",
            champion: null
        },
        {
            id: 3,
            tournament_name: "Copa America",
            tournament_type_display: "Knockout",
            teams_selection_display: "12 Teams",
            current_stage_display: "Final",
            status: "completed",
            tournament_image: "https://upload.wikimedia.org/wikipedia/en/9/99/Copa_Am%C3%A9rica_logo.svg",
            location: "South America",
            date: "July 10, 2024",
            tournament_format: "Knockout",
            champion: {
                club_name: "Argentina",
                club_image: "https://upload.wikimedia.org/wikipedia/en/c/c1/Argentina_national_football_team_logo.svg"
            }
        }
    ]);
    

    const [loading, setLoading] = useState(false);

    const [selectedTournament, setSelectedTournament] = useState(null);
    const [error, setError] = useState(null);
    const [showRoundOf16, setShowRoundOf16] = useState(false);

    function hideErrorContainer() {
        const errorContainer = document.getElementById('error-container');
        errorContainer.style.display = 'none';
    }

    // useEffect(() => {
    //     // Simulate data fetching with a delay
    //     const fetchDataWithDelay = async () => {
    //         try {
    //             // Simulate a delay of 2 seconds before fetching data
    //             await new Promise(resolve => setTimeout(resolve, 0));
    //             const response = await axios.get(config.apiEndpoint);
    //             setTournaments(response.data);
    //             setLoading(false); // Set loading to false after data is fetched

    //         } catch (error) {
    //             console.error('Error fetching tournaments data:', error);
    //             setError('Error fetching tournaments. Please try again later.');
    //             setLoading(false); // Set loading to false in case of an error

    //         }

    //     };

    //     fetchDataWithDelay();
    // }, []);

    const handleNavigate = tournament => {
        // setSelectedTournament(tournament);
        navigate(`/tournament/${tournament.id}`, { state: { tournament } });
    };

    const getStatusTag = (status) => {
        switch (status) {
            case "registering":
                return <div className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-full">Đang đăng ký</div>;
            case "active":
                return <div className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">Đang diễn ra</div>;
            case "completed":
                return <div className="bg-gray-500 text-white px-2 py-1 text-xs font-bold rounded-full">Đã kết thúc</div>;
            default:
                return null;
        }
    };

    const handleNext = () => {
        // Trigger the logic to show the RoundOf16 component
        setShowRoundOf16(true)
        console.log(selectedTournament)

    };

    const handleBackToTournaments = () => {
        {
            !showRoundOf16 ?
                setSelectedTournament(null) :
                setShowRoundOf16(false);
        }

    };


    if (error) {
        return (
            <div>
                <TournamentLabel selectedTournament={selectedTournament} />
                <div className="bg-slate-900 grid grid-rows-6 text-slate-300">

                    <div className="grid justify-center">

                        <div id="error-container" className="transition-all bg-red-200 flex gap-2 p-6  rounded-xl">
                            <XCircleIcon className="h-6 w-6 text-red-500" id="error-svg" />
                            <div id="error-message" className="text-red-500">{error}</div>
                        </div>
                        <div className="p-3">
                            <TournamentCardSkeleton />
                            <TournamentCardSkeleton />
                            <TournamentCardSkeleton />
                            <TournamentCardSkeleton />
                            <TournamentCardSkeleton />
                        </div>

                    </div>
                </div>

            </div>

        );
    }

    if (loading) {
        // Show the loading skeleton while data is being fetched
        return (
            <div className="bg-slate-900 text-slate-300">
                <TournamentLabel selectedTournament={selectedTournament} />

                <div className="grid justify-center">

                    <TournamentCardSkeleton />
                    <TournamentCardSkeleton />
                    <TournamentCardSkeleton />
                    <TournamentCardSkeleton />
                    <TournamentCardSkeleton />
                </div>
            </div>
        );
    }

    if (tournaments.length === 0) {
        return <div>No tournaments found.</div>;
    }

    return (
        <div className="bg-slate-900 text-slate-300">
            <TournamentLabel selectedTournament={selectedTournament} />
            <div className="grid justify-center">

                <div className="grid gap-10 md:grid-cols-3 p-6">
                    {tournaments.map(tournament => (
                        <div
                            key={tournament.id}
                            onClick={() => handleNavigate(tournament)}
                            className="relative w-[320px] h-[320px] text-gray-300 bg-gradient-to-br from-slate-900 to-gray-800 
                       hover:scale-[1.05] hover:shadow-lg hover:shadow-blue-500/30 transition-all ease-out duration-500 
                       p-6 rounded-xl backdrop-blur-lg drop-shadow-lg flex flex-col justify-between cursor-pointer"
                        >
                            {/* Background Icon (Blurred Trophy) */}
                            <TrophyIcon className="absolute w-48 h-48 opacity-5 -top-4 -right-4" />

                            {/* Tournament Status Tag */}
                            <div className="absolute top-3 right-3">{getStatusTag(tournament.status)}</div>

                            {/* Tournament Image */}
                            <div className="flex justify-center">
                                <img src={tournament.tournament_image} alt={tournament.tournament_name} className="w-20 h-20 object-contain drop-shadow-lg" />
                            </div>

                            {/* Tournament Info */}
                            <div className="text-center">
                                <h2 className="text-lg font-semibold text-teal-400">{tournament.tournament_name}</h2>
                                <p className="text-sm text-gray-400">{tournament.teams_selection_display} - {tournament.current_stage_display}</p>
                            </div>

                            {/* Location & Time */}
                            <div className="text-center mt-2 text-gray-400 text-sm">
                                📍 <span className="font-medium text-white">{tournament.location}</span>
                            </div>
                            <div className="text-center text-gray-400 text-sm">
                                🗓 <span className="font-medium text-white">{tournament.date}</span>
                            </div>

                            {/* Tournament Format */}
                            <div className="text-center mt-2 text-sm font-semibold text-blue-400">
                                ⚽ {tournament.tournament_format}
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default TournamentDetails;
