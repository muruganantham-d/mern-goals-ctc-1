//auth slice laye kudukkalam but file perusa pokum enpatharka this file use pannurom

import axios from 'axios';

const API_URL = '/api/users';

//why async ? we are make api call 
//userData come from authSlice
const register = async (userData) => {
    const response = await axios.post(API_URL,userData)
    
        //when use axious is send response form "data(key)" onject
    if(response.data) {
        //save local storage
        //1st param key, 2 what save you
        //response data is objects so use JSON.stringify
        localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
};

//same fromt register
const login = async (userData) => {
    const response = await axios.post(API_URL + "/login",userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
};

//for export register
const authService = {
    register,
    login,
};

export default authService;