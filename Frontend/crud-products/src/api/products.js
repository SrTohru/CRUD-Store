import axios from 'axios';

const PRODUCT_API = axios.create({
  baseURL: 'http://localhost:8000/api/producto',
});

export const getProducts = () => PRODUCT_API.get('/').then(res => res.data);  

export const createProduct = (product) => PRODUCT_API.post('/', product).then(res => res.data);