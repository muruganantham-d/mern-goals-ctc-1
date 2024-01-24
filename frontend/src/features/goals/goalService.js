import axios  from "axios";

const API_URL = '/api/goals/'

const createGoal = async (goalData, token) => {
    // pass token
     const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
     }
     //how to pass api call
     //2 parameter is over body data, 3rd beared token
     const response = await axios.post(API_URL, {text: goalData}, config)
     
     //recive response 
     return response.data
}

//////for get goal, same from above
const getGoal = async (token) => {
     const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
     }
     const response = await axios.get(API_URL, config)
     return response.data
};
///// For Delete Goals
const deleteGoal = async (id, token) => {
    const config = {
        headers: {
           Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config);
    return response.data;
}

const goalService = {
    createGoal,
    getGoal,
    deleteGoal,
};

export default goalService;