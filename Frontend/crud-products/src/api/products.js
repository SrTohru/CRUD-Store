import axios from 'axios';

const PRODUCT_API = axios.create({
  baseURL: 'http://localhost:8000/api/producto',
});

export const getProducts = ({page, search, ordering}) => PRODUCT_API.get('/', {
  params: {
    page,
    search,
    ordering
  }
}).then(res => res.data);  

export const createProduct = (product) => PRODUCT_API.post('/', product).then(res => res.data);

export const deleteProduct = (id) => PRODUCT_API.delete(`/${id}/`).then(res => res.data);

export const getProductById = (id) => PRODUCT_API.get(`/${id}/`).then(res => res.data);

export const updateProduct = (id, product) => PRODUCT_API.put(`/${id}/`, product).then(res => res.data);