import axios from "axios";

const API_URL = "http://localhost:5000/api/team";

export const getTeams = async()=>{
    try{
        const res = axios.get(API_URL);
        return res.data
    } catch(error){
        console.error("Erro fetching Teams data: ", error);
        throw error;
    }
}

export const getTeamById = async(id) =>{
    try{
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data
    }catch(error){
        console.error("Error fetching Team data: ", error);
        throw error;
    }
}

export const createTeam = async(teamData) =>{
    try{
        const res = await axios.post(API_URL, teamData);
        return res.data
    }catch(error){
        console.error("Error creating Team: ", error);
        throw error;
    }
}

export const deleteTeam = async(id) =>{
    try{    
        const res = await axios.delete(`${API_URL}/${id}`);
        return res.data
    } catch(error){
        console.error("Error deleting Team: ", error);
        throw error;
    }
}

export const updateTeam = async(id, teamData) =>{
    try{
        const res = await axios.put(`${API_URL}/${id}`, teamData);
        return res.data
    }catch(error){
        console.error("Error updating Team: ", error);
        throw error;
    }
}