import { Router } from 'express';
import searchRouter from './search.route.js';

const api = Router();

api.use('/products', searchRouter);

export default api;
