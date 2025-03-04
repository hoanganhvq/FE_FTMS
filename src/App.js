import logo from './logo.svg';
import './App.css';
import Example from "./components/gettingGroupTabs";
import NewTournamentForm from "./pages/ftms";
import {Box, Component} from "./components/new";
import Testing from "./components/testing";
import Figma from "./components/figma";
import Index from "./components";
import Tournaments from "./components/tournaments";
import Matches from "./components/matches";
import ClubsDetails from "./pages/teams";
import TournamentDetails from "./components/tournamentGroups";
import MatchesNew from "./components/matchesNewDesign";
import YourComponent from "./components/formatingDateTime";
import {BrowserRouter as Router, Route, Routes, useParams,} from "react-router-dom";
import Skeletontest from "./components/skeletontest";
import Layout from "./components/Layout";
import ClubForm from "./pages/clubForm";
import PhoneNumberInput from "./components/phoneNumberInput";
import PhoneNumberValidation from "./components/phoneNumberInput";
import QuarterfinalBrackets, {QualifyMatchBracket, QualifyTeamBracket} from "./components/qualifyMatch";
import RoundOf16 from "./components/roundOf16";
import QuarterFinals from "./components/quarterFinals";
import SemiFinals from "./components/semiFinals";
import Final from "./components/final";
import TestBrackets from "./components/testBrackets";
import RoundOf32 from "./components/roundOf32";
import DevelopmentWarning from "./components/DevelopmentWarning";
import TimePickerViewRenderers from "./components/timePicker";
import CustomTimePicker from "./components/customTimePicker";
import Home from "./pages/Home";
import GetGroups from "./components/gettingGroupTabs";
import DisExample from "./components/Disclosure";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import TournamentInformation from './pages/tournamentInfo';
import TeamDetail from './pages/teamDetail';
import ManageTournament from './pages/manageTournament';
import TournamentList from './pages/tournamentList';
import ManageClub from './pages/manageClub';
function App() {
    function ComponentWithTournamentId({component: Component}) {
        const {id} = useParams(); // Get the captured tournamentId from the URL

        // Pass the captured tournamentId as a prop to the Final component
        return <Component tournamentId={id}/>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/manage-clubs" element={<ManageClub/>} />
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/manage-tournaments/:id" element={<ManageTournament/>}/>
                    <Route path="/tournaments-list" element={<TournamentList/>}/>
                    <Route path="/tournament/:id" element={<TournamentInformation/>}/>
                    <Route path="/tournaments" element={<TournamentDetails/>}/>
                    <Route path="/clubs" element={<ClubsDetails/>}/>
                    <Route path="/club/:id" element={<TeamDetail/>}/>
                    <Route path="/new-tournament" element={<NewTournamentForm/>}/>
                    <Route path="/new-club" element={<ClubForm/>}/>
                    <Route path="/:id/test" element={<ComponentWithTournamentId component={TestBrackets}/>}/>
                    <Route path="/:id/groups" element={<ComponentWithTournamentId component={GetGroups}/>}/>
                    <Route path="/:id/round32" element={<ComponentWithTournamentId component={RoundOf32}/>}/>
                    <Route path="/:id/round16" element={<ComponentWithTournamentId component={RoundOf16}/>}/>
                    <Route path="/:id/quarterfinals" element={<ComponentWithTournamentId component={QuarterFinals}/>}/>
                    <Route path="/:id/semifinals" element={<ComponentWithTournamentId component={SemiFinals}/>}/>
                    <Route path="/:id/final" element={<ComponentWithTournamentId component={Final}/>}/>
                    <Route path="/testing" element={<DisExample tournamentId="89"/>}/>


                    {/*<Route path="/tabs" element={<Example />} />*/}
                    {/*<Route path="/skel" element={<Skeletontest />} />*/}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
