import axios from 'axios';

const API_URL = 'http://localhost:5000/api/match';

export const getMatches = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching Matches data:', error);
        throw error;
    }
};

export const updateMatch = async(id, matchData) =>{
    try{
        const response = await axios.put(`${API_URL}/update-match-round/${id}`, matchData);
        return response.data;
    } catch(error){
        console.error('Error updating match:', error);
        throw error;
    }
}




export const getMatchesByTournamentId = async(id) => {
    try{
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch(error){
        console.error('Error updating match:', error);
        
    }
}

export const createMatches =async (matches) =>{
    try{
        const res = await axios.post(`${API_URL}/generate-match-round`, {matches});
        return res.data
    }catch(error){
        console.error('Error creating match:', error);
    }
}

