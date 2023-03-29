import knex, { Knex } from 'knex';
import { createTables } from '../schemas/product';

// Define the configuration for the database connection
const dbConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DB || 'test_database',
    port: +(process.env.DB_PORT || 3306),
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
