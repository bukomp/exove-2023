import { Knex } from 'knex';
import { categoriesTableName } from '../models/categories.interfaces';
import { productsTableName } from '../models/products.interfaces';
import { variationsTableName } from '../models/variations.interfaces';

const createTables = async (knex: Knex): Promise<void> => {
  const hasProductsTable = await knex.schema.hasTable(productsTableName);
  if (!hasProductsTable) {
    await knex.schema.createTable(productsTableName, (table) => {
      table.uuid('id').primary().notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.datetime('created').notNullable();
      table.datetime('updated').notNullable();
    });
  }

  const hasCategoriesTable = await knex.schema.hasTable(categoriesTableName);
  if (!hasCategoriesTable) {
    await knex.schema.createTable(categoriesTableName, (table) => {
      table.uuid('id').primary().notNullable();
      table.string('name').notNullable();
      table
        .uuid('product_id')
        .notNullable()
        .references('id')
        .inTable(productsTableName);
      table.datetime('created').notNullable();
      table.datetime('updated').notNullable();
    });
  }

  const hasVariationsTable = await knex.schema.hasTable(variationsTableName);
  if (!hasVariationsTable) {
    await knex.schema.createTable(variationsTableName, (table) => {
      table.uuid('id').primary().notNullable();
      table
        .uuid('product_id')
        .notNullable()
        .references('id')
        .inTable(productsTableName);
      table.string('currency').notNullable().defaultTo('EURO');
      table.string('body').notNullable();
      table.datetime('created').notNullable();
      table.datetime('updated').notNullable();
    });
  }
};

export { createTables };
