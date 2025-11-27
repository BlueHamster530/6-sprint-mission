import { prismaClient } from '../libs/constants.js';
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../libs/structs.js';
import productRepository from '../repositories/productRepository.js';
export async function GetProduct(req, res) {
    const { offset = 0, limit = 0, order = 'newset', name = "", description = "" } = req.query;
    let orderBy;
    switch (order) {
        case 'oldest':
            orderBy = { createdAt: 'asc' };
            break;
        case 'newest':
            orderBy = { createdAt: 'desc' };
            break;
        default:
            orderBy = { createdAt: 'desc' };
    }
    // parse offset/limit and only include `take` when a positive integer is provided
    const parsedOffset = Number.isNaN(parseInt(offset)) ? 0 : parseInt(offset);
    const parsedLimit = parseInt(limit);

    const findOptions = {
        where: {
            name: {
                contains: name,
            },
            description: {
                contains: description,
            },
        },
        orderBy,
        skip: parsedOffset,
    };

    if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
        findOptions.take = parsedLimit;
    }

    const product = await prismaClient.product.findMany(findOptions);
    res.send(product);
}


export async function GetProductById(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new CustomError(400, 'ID는 숫자여야 합니다.');
    }
    const product = await productRepository.findById(id);
    res.send(product);
}

export async function PostProduct(req, res) {
    assert(req.body, CreateProduct);
    const { ...userFields } = req.body;
    const product = await productRepository.create(userFields);
    res.status(201).send(product);
}

export async function PatchProductById(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new CustomError(400, 'ID는 숫자여야 합니다.');
    }
    assert(req.body, PatchProduct);
    const { ...userFields } = req.body;
    const Product = await productRepository.update(id, userFields);
    res.send(Product);
}

export async function DeleteProductById(req, res) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        throw new CustomError(400, 'ID는 숫자여야 합니다.');
    }
    const Product = await productRepository.ondelete(id);
    res.send(Product);
}