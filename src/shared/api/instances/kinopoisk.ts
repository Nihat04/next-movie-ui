import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.KP_BASE_URL,
    headers: {
        'X-Api-Key': process.env.KP_TOKEN,
    },
});

export default axiosInstance;
