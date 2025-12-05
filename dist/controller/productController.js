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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_js_1 = require("../services/productService.js");
const superstruct_1 = require("superstruct");
const structs_js_1 = require("../structs/structs.js");
const productRepository_js_1 = __importDefault(require("../repositories/productRepository.js"));
class ProductController {
    GetProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const userId = req.user ? req.user.userId : null;
            const products = yield productService_js_1.productService.getProducts(findOptions, userId);
            res.send(products);
        });
    }
    GetProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.user ? req.user.userId : null;
            const product = yield productService_js_1.productService.getProductById(id, userId);
            res.send(product);
        });
    }
    PostProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, superstruct_1.assert)(req.body, structs_js_1.CreateProduct);
            const userFields = __rest(req.body, []);
            const product = yield productRepository_js_1.default.create(userFields);
            res.status(201).send(product);
        });
    }
    PatchProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            (0, superstruct_1.assert)(req.body, structs_js_1.PatchProduct);
            const userFields = __rest(req.body, []);
            const Product = yield productRepository_js_1.default.update(id, userFields);
            res.send(Product);
        });
    }
    DeleteProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const Product = yield productRepository_js_1.default.ondelete(id);
            res.send(Product);
        });
    }
    likeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.userId;
            const productId = req.params.id;
            const result = yield productService_js_1.productService.likeProduct(userId, productId);
            return res.status(200).json(result);
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=productController.js.map