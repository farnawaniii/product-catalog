import 'dotenv/config';

export const config = {
  mongoUri: process.env.MONGO_URI || 'mongodb://root:password@localhost:27017/catalog?authSource=admin',
  elasticUrl: process.env.ELASTIC_URL || 'http://localhost:9200',
  port: Number(process.env.PORT || 3000)
};
