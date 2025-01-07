import axios from 'axios';
import { Product } from '../types/product';

const API_URL = 'http://localhost:5000/api/products';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get(API_URL);
    return response.data as Product[];
  },

  async getProductById(id: string): Promise<Product> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data as Product;
  },
};
