import { Category } from './categories.interfaces';
import { Variation } from './variations.interfaces';

const productsTableName = 'products';

interface Product {
  id: string;
  name: string;
  description: string;
  categories: Category[];
  variations: Variation[];
}

interface ProductList {
  products: Product[];
  results: number;
}

export { Product, productsTableName, ProductList };
