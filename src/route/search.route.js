import { Router } from 'express';
import { handleSearch } from '../controller/search.controller.js';

const router = Router();

router.get('/search', handleSearch);

export default router;
