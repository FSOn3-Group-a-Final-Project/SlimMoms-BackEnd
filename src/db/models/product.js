import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  categories: { type: String, required: true },
  weight: { type: Number, default: 100 },
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  groupBloodNotAllowed: { type: [Boolean], required: true }
});

const Product = mongoose.model('Product', productSchema);

export default Product;