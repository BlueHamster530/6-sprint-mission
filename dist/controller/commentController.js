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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComment = GetComment;
exports.GetCommentById = GetCommentById;
exports.PostComment = PostComment;
exports.PatchCommentById = PatchCommentById;
exports.DeleteCommentById = DeleteCommentById;
const constants_js_1 = require("../libs/constants.js");
const superstruct_1 = require("superstruct");
const structs_js_1 = require("../structs/structs.js");
function GetComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productId, articleId } = req.query;
        const { take = '10', cursor } = req.query;
        const parsedTake = parseInt(take, 10);
        if (isNaN(parsedTake) || parsedTake <= 0) {
            return res.status(400).send({ error: 'Invalid "take" parameter.' });
        }
        const whereClause = {};
        if (productId) {
            whereClause.productId = productId; // 상품 ID로 필터링
        }
        else if (articleId) {
            whereClause.articleId = articleId; // 게시글 ID로 필터링
        }
        const findOptions = {
            take: parsedTake,
            where: whereClause,
            orderBy: {
                createdAt: 'desc',
            },
        };
        if (cursor) {
            findOptions.skip = 1;
            findOptions.cursor = {
                id: cursor,
            };
        }
        const comments = yield constants_js_1.prismaClient.comment.findMany(findOptions); // 
        let nextCursor = null;
        if (comments.length === parsedTake) {
            nextCursor = comments[comments.length - 1].id;
        }
        res.status(200).json({
            comments,
            nextCursor,
        });
    });
}
function GetCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const Comment = yield constants_js_1.prismaClient.comment.findUniqueOrThrow({
            where: {
                id
            },
        });
        res.send(Comment);
    });
}
function PostComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(req.body, structs_js_1.CreateComment);
        const { content, productId, articleId } = req.body;
        if ((productId && articleId) || (!productId && !articleId)) {
            return res.status(400).json({
                error: 'Comment must belong to EITHER a Product OR an Article.',
            });
        }
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Content cannot be empty.' });
        }
        const comment = yield constants_js_1.prismaClient.comment.create({
            data: {
                content: content,
                productId: productId,
                articleId: articleId,
            },
        });
        res.status(201).send(comment);
    });
}
function PatchCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        (0, superstruct_1.assert)(req.body, structs_js_1.PatchComment);
        const { content } = req.body;
        if (content !== undefined && content.trim() === '') {
            return res.status(400).json({ error: 'Content cannot be empty.' });
        }
        const comment = yield constants_js_1.prismaClient.comment.update({
            where: {
                id
            },
            data: {
                content: content,
            },
        });
        res.send(comment);
    });
}
function DeleteCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const Comment = yield constants_js_1.prismaClient.comment.delete({
            where: {
                id
            },
        });
        res.send(Comment);
    });
}
//# sourceMappingURL=commentController.js.map