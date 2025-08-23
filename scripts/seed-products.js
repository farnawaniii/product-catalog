import { connectMongo } from '../src/config/mongo.js';
import { Product } from '../src/model/product.model.js';

async function main() {
  await connectMongo();
  await Product.deleteMany({}); // clean slate for dev

  const docs = [
    { title: 'T-Shirt', description: 'Cotton tee', brand: 'Nike', category: 'Fashion', color: 'red',  size: 'S', price: 19.99, sku: 'TS-RED-S',  soldLast30Days: 120 },
    { title: 'T-Shirt', description: 'Cotton tee', brand: 'Nike', category: 'Fashion', color: 'red',  size: 'M', price: 19.99, sku: 'TS-RED-M',  soldLast30Days:  50 },
    { title: 'T-Shirt', description: 'Cotton tee', brand: 'Nike', category: 'Fashion', color: 'blue', size: 'S', price: 21.99, sku: 'TS-BLU-S',  soldLast30Days:  20 },
    { title: 'Running Shoes', description: 'Lightweight', brand: 'Adidas', category: 'Footwear', color: 'black', size: '42', price: 59.99, sku: 'SH-BLK-42', soldLast30Days: 200 },
    { title: 'Running Shoes', description: 'Lightweight', brand: 'Adidas', category: 'Footwear', color: 'black', size: '43', price: 59.99, sku: 'SH-BLK-43', soldLast30Days: 180 }
  ];

  await Product.insertMany(docs);
  console.log(`Seeded ${docs.length} products ✅`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
