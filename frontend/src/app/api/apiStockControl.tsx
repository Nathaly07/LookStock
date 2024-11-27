import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/inventory-logs',
});

export const getAllStock = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

export const createStock = async (stockData: {
  productId: string;
  employeeId: string;
  type: string;
  quantityChange: number;
  comment?: string;
}) => {
  try {
    const response = await api.post('/', stockData);
    return response.data;
  } catch (error) {
    console.error('Error creating stock entry:', error);
    throw error;
  }
};
