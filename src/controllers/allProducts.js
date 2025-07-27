import createHttpError from 'http-errors';
import Product from '../db/models/product.js';
import { isProductForbiddenForBloodType } from '../utils/isProductForbidden.js';
export const getAllProductsController = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    // kan grubuna göre
    const { bloodType } = req.query;
    let filteredProducts = allProducts;

    // ❗️Eğer kan grubu parametresi varsa filtre uygulama
    if (bloodType) {
      filteredProducts = allProducts.filter((product) =>
        isProductForbiddenForBloodType(product, bloodType),
      );
    }

    res.json({
      status: 200,
      message: 'Successfully retrieved all products!',
      data: filteredProducts,
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};

//ürün ekleme fonksiyon
export const createProduct = async (req, res, next) => {
  try {
    // Admin kontrolü
    if (!req.user?.isAdmin) {
      return res
        .status(403)
        .json({ message: 'Sadece adminler ürün ekleyebilir.' });
    }
    const { title, categories, weight, calories, groupBloodNotAllowed } =
      req.body;

    const newProduct = await Product.create({
      title,
      categories,
      weight,
      calories,
      groupBloodNotAllowed,
    });

    res.status(201).json({
      message: 'Ürün başarıyla oluşturuldu',
      product: newProduct,
    });
  } catch (error) {
    next(createHttpError(500, error));
  }
};
