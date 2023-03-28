import knex, { Knex } from 'knex';
import {
  ProductList,
  Product,
  productsTableName,
} from './models/products.interfaces';
import { categoriesTableName, Category } from './models/categories.interfaces';
import { Variation, variationsTableName } from './models/variations.interfaces';
import { createTables } from './schemas/product';
import { generateUUID } from './services/uuid.service';
import { replaceSpacesWithUnderscores } from '../../../utils/utils';

// Define the configuration for the database connection
const dbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DB || 'test_database',
  },
};

// Initialize the database connection
const db = knex(dbConfig);

const killConnection = async (knex: Knex): Promise<void> => {
  await knex.destroy();
};

const initDB = async (knex: Knex): Promise<void> => {
  await createTables(knex);
};

const cleanTables = async (knex: Knex): Promise<void> => {
  await knex('variations').del();
  await knex('categories').del();
  await knex('products').del();
};

export { initDB, killConnection, cleanTables, db };
