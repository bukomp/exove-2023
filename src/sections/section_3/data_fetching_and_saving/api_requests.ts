import axios from 'axios';
import { ProductList } from './models/products.interfaces';

const fetchProductList = async (): Promise<ProductList> => {
  const apiUrl = process.env.PRODUCTS_URL || '';
  return (await axios.get(apiUrl)).data;
};

export { fetchProductList };
