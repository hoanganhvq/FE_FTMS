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
        const response = await axios.put(`${API_URL}/${id}`, matchData);
        return response.data;
    } catch(error){
        console.error('Error updating match:', error);
        throw error;
    }
}