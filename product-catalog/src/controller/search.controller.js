import { searchProducts } from '../service/search.service.js';

export async function handleSearch(req, res) {
  try {
    const { q, brand, color, size, category, priceMin, priceMax, limit, offset } = req.query;
    const data = await searchProducts({ q, brand, color, size, category, priceMin, priceMax, limit, offset });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
}
