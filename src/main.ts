import util from 'util';
import dotenv from 'dotenv';
import { mockUpdatedList } from './sections/section_3/data_fetching_and_saving/mock_data/updated_list.mock';
dotenv.config();

import { fetchProductList } from './sections/section_3/data_fetching_and_saving/api_requests';
import {
  db,
  initDB,
  killConnection,
  cleanTables,
} from './sections/section_3/data_fetching_and_saving/db';
import {
  getProductList,
  updateOrInsertProductList,
} from './sections/section_3/data_fetching_and_saving/services/product.db.service';

//modify console.log to deep log objects
console.table = (object) => {
  console.log(
    util.inspect(object, { showHidden: false, depth: null, colors: true })
  );
};

/**
 * main function
 */
const main = async (): Promise<void> => {
  await initDB(db);
  await cleanTables(db);

  let dbProductList = await getProductList(db);
  console.table(dbProductList);

  const fetchedProductList = await fetchProductList();

  await updateOrInsertProductList(db, fetchedProductList.products);

  dbProductList = await getProductList(db);
  console.table(dbProductList);

  await updateOrInsertProductList(db, mockUpdatedList.products);

  dbProductList = await getProductList(db);
  console.table(dbProductList);

  await killConnection(db);
};

main();
