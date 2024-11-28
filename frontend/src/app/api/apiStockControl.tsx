import axios from 'axios';

const BASE_URL = 'http://localhost:4000/inventory-logs';

export const getLogs = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};


export const createLog = async (logData: {
  productId: string;
  employeeId: string;
  type: string;
  quantityChange: number;
  comment: string;
}) => {
  try {
    const response = await axios.post(BASE_URL, logData);
    return response.data;
  } catch (error) {
    console.error('Error creating log:', error);
    throw error;
  }
};
