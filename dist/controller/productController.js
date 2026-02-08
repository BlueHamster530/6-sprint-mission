"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = require("../services/productService");
const superstruct_1 = require("superstruct");
const structs_1 = require("../structs/structs");
const errorHandler_1 = require("../libs/Handler/errorHandler");
const removeTool_1 = require("./../libs/removeTool");
class ProductController {
    constructor() {
        this.GetProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { offset = '0', limit = '0', order = 'newest', name = "", description = "" } = req.query;
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
            const parsedOffset = parseInt(offset, 10) || 0;
            const parsedLimit = parseInt(limit, 10) || 0;
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
            if (parsedLimit > 0) {
                findOptions.take = parsedLimit;
            }
            const userId = req.user ? req.user.userId : null;
            if (!userId)
                throw new errorHandler_1.CustomError(404, "UserId Not Found");
            const products = yield productService_1.productService.getProducts(findOptions, userId);
            res.send(products);
        });
        this.GetProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                throw new errorHandler_1.CustomError(400, "id is required");
            const _id = parseInt(id);
            const userId = req.user ? req.user.userId : null;
            if (!userId)
                throw new errorHandler_1.CustomError(404, "userId Not Found");
            const product = yield productService_1.productService.getProductById(_id, userId);
            res.send(product);
        });
        this.PostProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            (0, superstruct_1.assert)(req.body, structs_1.CreateProduct);
            const userFields = __rest(req.body, []);
            const userId = req.user ? req.user.userId : null;
            if (!userId)
                throw new errorHandler_1.CustomError(404, "userId Not Found");
            const product = yield productService_1.productService.createProducts(Object.assign(Object.assign({}, userFields), { userId }));
            res.status(201).send(product);
        });
        this.PatchProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                throw new errorHandler_1.CustomError(400, "id is required");
            const _id = parseInt(id);
            const userId = req.user ? req.user.userId : null;
            if (!userId)
                throw new errorHandler_1.CustomError(401, "Unauthorized");
            (0, superstruct_1.assert)(req.body, structs_1.PatchProduct);
            const userFields = (0, removeTool_1.removeUndefined)(req.body);
            const { product, notifications } = yield productService_1.productService.updateProduct(_id, userFields);
            if (notifications && notifications.length > 0) {
                const io = req.app.get('io');
                if (io) {
                    notifications.forEach((noti) => {
                        io.to(noti.userId).emit('notification', noti);
                    });
                }
            }
            res.send(product);
        });
        this.DeleteProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id)
                throw new errorHandler_1.CustomError(400, "id is required");
            const _id = parseInt(id);
            const userId = req.user ? req.user.userId : null;
            if (!userId)
                throw new errorHandler_1.CustomError(404, "userId Not Found");
            const Product = yield productService_1.productService.deleteProduct(_id);
            res.send(Product);
        });
        this.likeProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                throw new errorHandler_1.CustomError(404, "user Not Found");
            const userId = req.user.userId;
            const productId = req.params.id;
            if (!productId)
                throw new errorHandler_1.CustomError(400, "productId is required");
            const _productId = parseInt(productId);
            const result = yield productService_1.productService.likeProduct(userId, _productId);
            return res.status(200).json(result);
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productController.js.map