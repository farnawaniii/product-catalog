import { connectMongo } from '../src/config/mongo.js';
import { Product } from '../src/model/product.model.js';
import { es } from '../src/config/elastic.js';

const indexName = 'products_v1';

async function main() {
  await connectMongo();

  const cursor = Product.find({}).cursor();
  const ops = [];
  let count = 0;

  for await (const doc of cursor) {
    const src = {
      title: doc.title,
      description: doc.description,
      brand: doc.brand,
      category: doc.category,
      color: doc.color,
      size: doc.size,
      price: doc.price,
      soldLast30Days: doc.soldLast30Days,
      createdAt: doc.createdAt
    };
    ops.push({ index: { _index: indexName, _id: doc._id.toString() } });
    ops.push(src);

    if (ops.length >= 1000) {
      await es.bulk({ refresh: true, operations: ops });
      count += ops.length / 2;
      ops.length = 0;
    }
  }
  if (ops.length) {
    await es.bulk({ refresh: true, operations: ops });
    count += ops.length / 2;
  }

  console.log(`Synced ${count} products to ES ✅`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
