import axios from 'axios';

// ضع الـ IP الخاص بجهازك هنا بدلاً من 192.168.X.X مع إبقاء البورت 3000
const baseURL = 'http://192.168.1.8:3000/api'; 

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;