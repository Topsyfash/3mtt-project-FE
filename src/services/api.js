import axios from 'axios';

//  const API = axios.create({ baseURL: 'https://movie-app-be-5k5e.onrender.com/api' });

const API = axios.create({ baseURL: 'http://localhost:8000/api' });


API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
export default API
