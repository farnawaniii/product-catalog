#!/bin/sh
set -e

echo "⏳ Waiting for MongoDB..."
until nc -z mongo 27017; do
  sleep 2
done

echo "⏳ Waiting for Elasticsearch..."
until nc -z elasticsearch 9200; do
  sleep 2
done

echo "✅ Databases are up, running setup..."

# Seed Mongo
npm run seed

# Create ES index
npm run create:index

# Sync Mongo -> ES
npm run sync

echo "🚀 Starting API..."
exec npm start
