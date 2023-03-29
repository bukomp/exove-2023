import dotenv from 'dotenv';
dotenv.config();

import { describe, expect, test, beforeAll } from '@jest/globals';
import knex, { Knex } from 'knex';
import { peoplePhoneCombinationQuery } from '../sections/section_2/sql_query_task';

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DB || 'test_database',
    port: +(process.env.DB_PORT || 3306),
  },
});

describe('SQL query test', () => {
  test('should return the expected result', async () => {
    await initDbForTest(db);

    const result = await db.raw(peoplePhoneCombinationQuery);
    expect(result[0]).toEqual([
      { name: 'Anna Kråkström', numbers: '+46 771 793 336' },
      { name: 'Gerhard Feuerhaufen', numbers: null },
      { name: 'John Smith', numbers: '+1 604 444 4444,+44 20 8759 9036' },
      { name: 'Mary Jones', numbers: '+1 213 621 0002,+1 800 444 4444' },
      { name: 'Rami Pitkäniemi', numbers: '+358 50 333 3333' },
    ]);

    await db.destroy();
  });
});

const initDbForTest = async (knex: Knex): Promise<void> => {
  const hasPeopleTable = await knex.schema.hasTable('people');
  const hasPhonesTable = await knex.schema.hasTable('phones');

  if (hasPhonesTable) await knex.schema.dropTable('phones');

  if (hasPeopleTable) await knex.schema.dropTable('people');

  await knex.schema.createTable('people', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
  });

  await knex.schema.createTable('phones', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.string('number');
    table.foreign('user_id', 'phones_user_id_foreign').references('people.id');
  });

  await knex('people').insert([
    { first_name: 'John', last_name: 'Smith' },
    { first_name: 'Mary', last_name: 'Jones' },
    { first_name: 'Gerhard', last_name: 'Feuerhaufen' },
    { first_name: 'Rami', last_name: 'Pitkäniemi' },
    { first_name: 'Anna', last_name: 'Kråkström' },
  ]);

  await knex('phones').insert([
    { user_id: 2, number: '+1 213 621 0002' },
    { user_id: 2, number: '+1 800 444 4444' },
    { user_id: 1, number: '+1 604 444 4444' },
    { user_id: 1, number: '+44 20 8759 9036' },
    { user_id: 4, number: '+358 50 333 3333' },
    { user_id: 5, number: '+46 771 793 336' },
  ]);
};
