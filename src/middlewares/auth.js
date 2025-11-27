import { expressjwt } from 'express-jwt';
import productRepository from '../repositories/productRepository.js';
import { CustomError } from '../libs/Handler/errorHandler.js';

const verifyAccessToken = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'user'
});

async function verifyProduectAuth(req, res, next) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new CustomError(400, "ID는 숫자여야 합니다.");
    }

    const product = await productRepository.findById(id);
    if (!product) {
        throw new CustomError(404, 'product not found');
    }
    if (product.authorId !== req.user.id) {
        throw new CustomError(403, 'Forbidden');
    }
    return next();
};

export default {
    verifyAccessToken,
    verifyProduectAuth,
};