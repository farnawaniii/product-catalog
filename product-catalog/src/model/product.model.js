import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    brand: String,
    category: String,
    color: String,
    size: String,
    price: Number,
    sku: { type: String, unique: true, index: true },
    soldLast30Days: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);
