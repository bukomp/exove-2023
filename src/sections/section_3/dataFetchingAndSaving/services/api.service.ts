import axios from 'axios';
import { ProductList } from '../models/products.interfaces';

const fetchProductList = async (): Promise<ProductList> => {
  const apiUrl =
    process.env.PRODUCTS_URL ||
    'https://raw.githubusercontent.com/Exove/developer-test/main/material/products.json';
  return (await axios.get(apiUrl)).data;
};

export { fetchProductList };
