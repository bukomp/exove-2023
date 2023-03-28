const categoriesTableName = 'categories';

interface Category {
  id: string;
  product_id?: string;
  name: string;
}

export { categoriesTableName, Category };
