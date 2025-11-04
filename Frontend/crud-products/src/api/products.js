import axios from 'axios';

const PRODUCT_API = axios.create({
  baseURL: 'http://localhost:8000/api/producto',
});

export const getProducts = async () => {
    const response = await PRODUCT_API.get('/');

    if (response.status !== 200) {
        throw new Error('Failed to fetch products');
    }

    return response.data;
}