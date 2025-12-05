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
const articleService_js_1 = require("../services/articleService.js");
const superstruct_1 = require("superstruct");
const structs_js_1 = require("../structs/structs.js");
const articleRepository_js_1 = __importDefault(require("../repositories/articleRepository.js"));
class ArticleController {
    getArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offset = 0, limit = 0, order = 'newset', title = "", content = "" } = req.query;
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
                    title: {
                        contains: title,
                    },
                    content: {
                        contains: content,
                    },
                },
                orderBy,
                skip: parsedOffset,
            };
            if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
                findOptions.take = parsedLimit;
            }
            const userId = req.user ? req.user.userId : null;
            const articles = yield articleService_js_1.articleService.getArticles(findOptions, userId);
            res.send(articles);
        });
    }
    getArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userId = req.user ? req.user.userId : null;
            const article = yield articleService_js_1.articleService.getArticleById(id, userId);
            res.send(article);
        });
    }
    postArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, superstruct_1.assert)(req.body, structs_js_1.CreateArticle);
            const userFields = __rest(req.body, []);
            const article = yield articleRepository_js_1.default.create(userFields);
            res.status(201).send(article);
        });
    }
    patchArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            (0, superstruct_1.assert)(req.body, structs_js_1.PatchArticle);
            const userFields = __rest(req.body, []);
            const article = yield articleRepository_js_1.default.update(id, userFields);
            res.send(article);
        });
    }
    deleteArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const article = yield articleRepository_js_1.default.ondelete(id);
            res.send(article);
        });
    }
    likeArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.userId;
            const articleId = req.params.id;
            const result = yield articleService_js_1.articleService.likeArticle(userId, articleId);
            return res.status(200).json(result);
        });
    }
}
exports.default = ArticleController;
//# sourceMappingURL=articleController.js.map