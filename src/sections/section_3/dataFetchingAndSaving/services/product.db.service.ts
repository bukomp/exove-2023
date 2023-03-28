import { Knex } from 'knex';
import { Category, categoriesTableName } from '../models/categories.interfaces';
import { Product, productsTableName } from '../models/products.interfaces';
import {
  Variation,
  variationsTableName,
} from '../models/variations.interfaces';
import { generateUUID } from './uuid.service';

const updateOrInsertProductList = async (
  knex: Knex,
  productList: Product[]
): Promise<void> => {
  for (let product of productList) {
    await insertOrUpdateProduct(knex, product);
    await deleteUnusedCategoriesForProduct(knex, product);
    for (const category of product.categories) {
      await insertOrUpdateCategoryForProduct(knex, product, category);
    }
    await deleteUnusedVariationsForProduct(knex, product);
    for (const variation of product.variations) {
      await insertVariationForProduct(knex, product, variation);
    }
  }
};

const getProductList = async (knex: Knex): Promise<Product[]> => {
  const products = await knex.raw(/*sql*/ `
    SELECT 
        products.id AS id,
        products.name AS name,
        products.description AS description,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', categories.id, 'name', categories.name)
            )
            FROM categories 
            WHERE categories.product_id = products.id
        ) AS categories,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT('id', variations.id, 'body', variations.body, 'currency', variations.currency)
            )
            FROM variations 
            WHERE variations.product_id = products.id
        ) AS variations 
    FROM products;
  `);

  return unpackAllVariationsObjects(products[0]);
};

const unpackAllVariationsObjects = async (
  products: Product[]
): Promise<Product[]> => {
  products.forEach((p) => {
    p.variations = p.variations?.map((v) => {
      const { id, body, ...restOfVariation } = v;

      return { id, ...restOfVariation, ...JSON.parse(body as string) };
    });
  });

  return products;
};

const insertVariationForProduct = async (
  knex: Knex,
  product: Product,
  variation: Variation
): Promise<void> => {
  const variationJSON = JSON.stringify(variation);

  const productsVariationsDuplicates = (
    await knex(variationsTableName)
      .select('id')
      .where({ body: variationJSON })
      .andWhere({ product_id: product.id })
  ).length;

  if (!productsVariationsDuplicates) {
    const variationId = variation.id || generateUUID();
    delete variation.id;

    await knex(variationsTableName).insert({
      id: variationId,
      product_id: product.id,
      body: variationJSON,
    });
  }
};

const deleteUnusedVariationsForProduct = async (
  knex: Knex,
  product: Product
): Promise<void> => {
  await knex(variationsTableName)
    .whereNotIn(
      'body',
      product.variations.map((v) => JSON.stringify(v))
    )
    .andWhere({ product_id: product.id })
    .del();
};

const insertOrUpdateCategoryForProduct = async (
  knex: Knex,
  product: Product,
  category: Category
): Promise<void> => {
  const { id: categoryId, product_id, name } = category;

  if (!categoryId) {
    throw new Error('Category ID is required to update the category data.');
  }

  let productsCategoriesUpdatedOrDuplicates = await knex(categoriesTableName)
    .where({ id: categoryId })
    .andWhere({ product_id: product.id })
    .andWhereNot({ name })
    .update({ name });

  const productsCategoriesDuplicates = (
    await knex(categoriesTableName)
      .select('id')
      .where({ id: categoryId })
      .andWhere({ product_id: product.id })
  ).length;

  if (!productsCategoriesUpdatedOrDuplicates && !productsCategoriesDuplicates) {
    if (!category.id) {
      category.id = generateUUID();
    }
    await knex(categoriesTableName).insert({
      ...category,
      product_id: product.id,
    });
  }
};

const deleteUnusedCategoriesForProduct = async (
  knex: Knex,
  product: Product
): Promise<void> => {
  await knex(categoriesTableName)
    .whereNotIn(
      'id',
      product.categories.map((c) => c.id)
    )
    .andWhere({ product_id: product.id })
    .del();
};

const insertOrUpdateProduct = async (
  knex: Knex,
  product: Product
): Promise<void> => {
  const { categories, variations, ...productData } = product;

  if (!productData.id) {
    productData.id = generateUUID();
    await knex(productsTableName).insert(productData);
  } else {
    const updatedProducts = await knex(productsTableName)
      .where({ id: productData.id })
      .update(productData);
    if (!updatedProducts) {
      await knex(productsTableName).insert(productData);
    }
  }
};

export { updateOrInsertProductList, getProductList };
