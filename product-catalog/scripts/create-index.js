import { es } from '../src/config/elastic.js';

const indexName = 'products_v1';

async function main() {
  const exists = await es.indices.exists({ index: indexName });
  if (exists) {
    console.log(`Index ${indexName} already exists`);
    process.exit(0);
  }

  await es.indices.create({
    index: indexName,
    settings: {
      analysis: {
        analyzer: {
          text_analyzer: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'asciifolding']
          }
        }
      }
    },
    mappings: {
      properties: {
        title: { type: 'text', analyzer: 'text_analyzer' },
        description: { type: 'text', analyzer: 'text_analyzer' },
        brand: { type: 'keyword' },
        category: { type: 'keyword' },
        color: { type: 'keyword' },
        size: { type: 'keyword' },
        price: { type: 'double' },
        soldLast30Days: { type: 'integer' },
        createdAt: { type: 'date' }
      }
    }
  });

  console.log(`Created index ${indexName} ✅`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
