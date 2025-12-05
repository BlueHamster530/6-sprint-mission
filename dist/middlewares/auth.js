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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const productRepository_js_1 = __importDefault(require("../repositories/productRepository.js"));
const articleRepository_js_1 = __importDefault(require("../repositories/articleRepository.js"));
const errorHandler_js_1 = require("../libs/Handler/errorHandler.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'user'
});
const softVerifyAccessToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) {
                req.user = user;
            }
            next();
        });
    }
    else {
        next();
    }
};
const verifyRefreshToken = (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => req.cookies.refreshToken,
});
function verifyProduectAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const product = yield productRepository_js_1.default.findById(id);
        if (!product) {
            throw new errorHandler_js_1.CustomError(404, 'product not found');
        }
        if (product.authorId !== req.user.id) {
            throw new errorHandler_js_1.CustomError(403, 'Forbidden');
        }
        return next();
    });
}
;
function verifyArticleAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const article = yield articleRepository_js_1.default.findById(id);
        if (!article) {
            throw new errorHandler_js_1.CustomError(404, 'article not found');
        }
        if (article.authorId !== req.user.id) {
            throw new errorHandler_js_1.CustomError(403, 'Forbidden');
        }
        return next();
    });
}
exports.default = {
    verifyAccessToken,
    softVerifyAccessToken,
    verifyProduectAuth,
    verifyArticleAuth,
    verifyRefreshToken,
};
//# sourceMappingURL=auth.js.map