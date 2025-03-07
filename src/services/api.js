import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Add a new resident
  addResident(residentData) {
    return apiClient.post('/residents', residentData);
  },
};