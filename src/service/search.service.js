import { es } from '../config/elastic.js';

const INDEX = 'products_v1';

export async function searchProducts({ q, brand, color, size, category, priceMin, priceMax, limit = 20, offset = 0 }) {
  const must = [];
  const filter = [];

  if (q) {
    must.push({
      multi_match: {
        query: q,
        fields: ['title^3', 'description', 'brand^2']
      }
    });
  }

  if (brand)  filter.push({ term: { brand } });
  if (color)  filter.push({ term: { color } });
  if (size)   filter.push({ term: { size } });
  if (category) filter.push({ term: { category } });

  if (priceMin || priceMax) {
    const range = {};
    if (priceMin) range.gte = Number(priceMin);
    if (priceMax) range.lte = Number(priceMax);
    filter.push({ range: { price: range } });
  }

  const body = {
    from: Number(offset),
    size: Number(limit),
    query: {
      function_score: {
        query: {
          bool: { must, filter }
        },
        functions: [
          { field_value_factor: { field: 'soldLast30Days', modifier: 'log1p', factor: 0.2, missing: 0 } }
        ],
      boost_mode: 'sum',
      score_mode: 'sum'
      }
    }
  };

  const resp = await es.search({ index: INDEX, body });
  return {
    total: resp.hits.total?.value ?? 0,
    results: resp.hits.hits.map(h => ({ id: h._id, ...h._source }))
  };
}
