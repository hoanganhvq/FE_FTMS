import axios from'axios';

const API_URL = 'http://localhost:5000/api/user';

export const register = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/register`, userData);
        return res.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const res = await axios.post(`${API_URL}/login`, userData);
        return res.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const getMe = async(token)=>{
    try{
        const res = await axios.get(`${API_URL}/me`,{
            headers: {Authorization: `Bearer ${token}`} //You can use interceptor to get token
        });

        return res.data
    } catch(error){
        console.error("Error fetching User data: ", error);
        throw error;
    }
}

