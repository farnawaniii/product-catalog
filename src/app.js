import express from 'express';
import { config } from './config/env.js';
import apiRoutes from './route/index.js';

const app = express();
app.use(express.json());

// simple health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/', apiRoutes);

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
