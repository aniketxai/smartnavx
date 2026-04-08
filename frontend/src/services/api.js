import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookResource = async (bookingData) => {
  try {
    const response = await api.post('/api/book', bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to book resource' };
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get('/api/bookings');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch bookings' };
  }
};

export default api;
