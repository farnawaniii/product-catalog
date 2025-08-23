import { Client } from '@elastic/elasticsearch';
import { config } from './env.js';

export const es = new Client({ node: config.elasticUrl });
