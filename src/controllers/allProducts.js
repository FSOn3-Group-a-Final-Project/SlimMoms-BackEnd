import createHttpError from 'http-errors';
import { getAllProducts } from '../db/models/product.js';


export const getAllProductsController = async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.json({
            status: 200,
            message: 'Successfully retrieved all products!',
            data: allProducts,
        });
    } catch (error) {
        next(createHttpError(500, error));
    }
};

