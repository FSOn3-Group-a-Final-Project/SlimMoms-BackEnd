import { Day } from '../db/models/day.js';
import Product from '../db/models/product.js';
import createHttpError from 'http-errors';

export const addProductController = async (req, res) => {
  const { date, productId, weight } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  let day = await Day.findOne({ userId, date });

  if (day) {
    // Gün kaydı varsa, ürünü ekle
    day.products.push({ productId, weight });
    await day.save();
  } else {
    // Gün kaydı yoksa, yeni bir gün oluştur
    day = await Day.create({
      userId,
      date,
      products: [{ productId, weight }],
    });
  }

  res.status(201).json({
    status: 'success',
    message: 'Product added to the day successfully.',
    data: day,
  });
};

export const deleteProductController = async (req, res) => {
  const { date, productId } = req.body;
  const userId = req.user._id;

  const day = await Day.findOneAndUpdate(
    { userId, date },
    { $pull: { products: { _id: productId } } },
    { new: true },
  );

  if (!day) {
    throw createHttpError(404, 'Day not found or product not in the list');
  }

  res.status(200).json({
    status: 'success',
    message: 'Product deleted from the day successfully.',
    data: day,
  });
};

export const getDayInfoController = async (req, res) => {
  const { date } = req.query;
  const userId = req.user._id;

  const day = await Day.findOne({ userId, date }).populate(
    'products.productId',
  );

  if (!day) {
    throw createHttpError(404, 'No information found for this date');
  }

  res.status(200).json({
    status: 'success',
    message: 'Day information retrieved successfully.',
    data: day,
  });
};
