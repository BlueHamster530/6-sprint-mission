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
const constants_1 = require("../libs/constants");
function findAll(take, cursor, productId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const whereClause = {};
        if (productId) {
            whereClause.productId = productId;
        }
        else if (articleId) {
            whereClause.articleId = articleId;
        }
        const findOptions = {
            take: take,
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
        return constants_1.prismaClient.comment.findMany(findOptions);
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.comment.findUniqueOrThrow({
            where: { id },
        });
    });
}
function create(content, userId, productId, articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.comment.create({
            data: {
                content,
                userId,
                productId,
                articleId,
            },
        });
    });
}
function update(id, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.comment.update({
            where: { id },
            data: { content },
        });
    });
}
function deleteComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.comment.delete({
            where: { id },
        });
    });
}
// [추가] 상품 주인 찾기
function findProductOwner(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.product.findUnique({
            where: { id: productId },
            select: { userId: true, name: true } // 주인 ID와 상품명만 가져옴
        });
    });
}
// [추가] 아티클 주인 찾기
function findArticleOwner(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.article.findUnique({
            where: { id: articleId },
            select: { userId: true, title: true } // 주인 ID와 제목만 가져옴
        });
    });
}
// [추가] 알림 생성
function createNotification(userId, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.notification.create({
            data: {
                userId,
                content,
                isRead: false,
            }
        });
    });
}
exports.default = {
    findAll,
    findById,
    create,
    update,
    findProductOwner,
    findArticleOwner,
    createNotification,
    delete: deleteComment,
};
//# sourceMappingURL=commentRepository.js.map