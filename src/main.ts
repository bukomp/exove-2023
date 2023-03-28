import util from 'util';
import dotenv from 'dotenv';
import { mockUpdatedList } from './sections/section_3/dataFetchingAndSaving/mock_data/updatedList.mock';
import { fetchProductList } from './sections/section_3/dataFetchingAndSaving/services/api.service';
import {
  initDB,
  db,
  cleanTables,
  killConnection,
} from './sections/section_3/dataFetchingAndSaving/services/db.service';
import {
  getProductList,
  updateOrInsertProductList,
} from './sections/section_3/dataFetchingAndSaving/services/product.db.service';
dotenv.config();

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
