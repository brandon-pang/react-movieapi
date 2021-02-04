import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "e14cc7e51b086b49fbf7d2766dc1239a",
        language: "en-US"
    }
});

export default api;