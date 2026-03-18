import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://literate-space-invention-v6rwjx5x7rjj2pv5w-5000.app.github.dev/api',
    timeout: 5000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
