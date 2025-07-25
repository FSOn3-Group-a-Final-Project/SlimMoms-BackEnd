import createHttpError from 'http-errors';
import Product from '../db/models/product.js';

export const getAllProductsController = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.json({
      status: 200,
      message: 'Successfully retrieved all products!',
      data: allProducts,
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};

//ürün ekleme fonksiyon
export const createProduct = async (req, res, next) => {
  try {
    const { title, categories, weight, calories, groupBloodNotAllowed } = req.body;

    const newProduct = await Product.create({
      title,
      categories,
      weight,
      calories,
      groupBloodNotAllowed,
    });

    res.status(201).json({
      message: "Ürün başarıyla oluşturuldu",
      product: newProduct,
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};