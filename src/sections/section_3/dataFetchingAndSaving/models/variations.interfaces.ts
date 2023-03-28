const variationsTableName = 'variations';

interface Variation {
  id?: string;
  body?: string;
  product_id?: string;
  currency?: string;
  [key: string]: any;
}

export { Variation, variationsTableName };
