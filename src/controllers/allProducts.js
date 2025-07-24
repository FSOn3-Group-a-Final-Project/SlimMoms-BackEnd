import createHttpError from 'http-errors';
import Product from '../db/models/product.js';


export const getAllProductsController = async (req, res, next) => {
    try {
        const allProducts = await Product.find({});
        res.json({
            status: 200,
            message: 'Successfully retrieved all products!',
            data: allProducts,
        });
    } catch (error) {
        next(createHttpError(500, 'Error in getAllProductsController'));
    }
};

