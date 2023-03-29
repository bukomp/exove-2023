import dotenv from 'dotenv';
dotenv.config();

import { describe, expect, test, beforeAll } from '@jest/globals';
import knex, { Knex } from 'knex';
import { peoplePhoneCombinationQuery } from '../sections/section_2/sql_query_task';
import {
  fetchProductList,
  getProductList,
  updateOrInsertProductList,
} from '../sections/section_3/dataFetchingAndSaving/services';
import { variationsTableName } from '../sections/section_3/dataFetchingAndSaving/models/variations.interfaces';
import { categoriesTableName } from '../sections/section_3/dataFetchingAndSaving/models/categories.interfaces';
import { productsTableName } from '../sections/section_3/dataFetchingAndSaving/models/products.interfaces';
import { createTables } from '../sections/section_3/dataFetchingAndSaving/schemas/product';
import {
  result1,
  updatedResult2,
} from './desiredResults/APIandSQL.testResults';
import { mockProductList, mockUpdatedList } from './mock_data';

let db: Knex;

describe('API and SQL tests', () => {
  test('should fetch product info from url', async () => {
    connectToDB();

    const result = await fetchProductList();

    expect(result).toEqual(mockProductList);

    await db.destroy();
  });

  test('should save product info to DB', async () => {
    connectToDB();

    const response = await fetchProductList();
    await initDbForTest(db);
    await updateOrInsertProductList(db, response.products);

    const savedProducts = await getProductList(db);
    const partialExpected = expect.objectContaining(result1 as any);
    expect(savedProducts).toEqual(partialExpected);

    await db.destroy();
  });

  test('should update product info to DB from the same function as saved from', async () => {
    connectToDB();

    await initDbForTest(db);

    const response = await fetchProductList();
    await updateOrInsertProductList(db, response.products);
    await updateOrInsertProductList(db, mockUpdatedList.products);

    const savedProducts = await getProductList(db);
    const partialExpected = expect.objectContaining(updatedResult2 as any);
    expect(savedProducts).toEqual(partialExpected);

    await db.destroy();
  });
});

const connectToDB = (): void => {
  db = knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DB || 'test_database',
      port: +(process.env.DB_PORT || 3306),
    },
  });
};

const initDbForTest = async (knex: Knex): Promise<void> => {
  const hasVariationsTable = await knex.schema.hasTable(variationsTableName);
  const hasCategoriesTable = await knex.schema.hasTable(categoriesTableName);
  const hasProductsTable = await knex.schema.hasTable(productsTableName);

  if (hasVariationsTable) await knex.schema.dropTable(variationsTableName);
  if (hasCategoriesTable) await knex.schema.dropTable(categoriesTableName);
  if (hasProductsTable) await knex.schema.dropTable(productsTableName);

  await createTables(knex);
};
