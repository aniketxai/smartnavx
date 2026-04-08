import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const toClientError = (error, fallbackMessage) => {
  const message =
    error?.response?.data?.msg ||
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage;

  return {
    message,
    status: error?.response?.status,
    data: error?.response?.data,
  };
};

export const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    throw toClientError(error, 'Failed to fetch rooms');
  }
};

export const bookResource = async (bookingData) => {
  try {
    const response = await api.post('/book', bookingData);
    return response.data;
  } catch (error) {
    throw toClientError(error, 'Failed to book resource');
  }
};

export const getBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data;
  } catch (error) {
    throw toClientError(error, 'Failed to fetch bookings');
  }
};

export const checkAccess = async ({ rfid, roomId }) => {
  try {
    const response = await api.post('/check-access', { rfid, roomId });
    return response.data;
  } catch (error) {
    throw toClientError(error, 'Failed to check access');
  }
};

export default api;
