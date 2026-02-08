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
exports.commentService = void 0;
const commentRepository_1 = __importDefault(require("../repositories/commentRepository"));
const errorHandler_1 = require("../libs/Handler/errorHandler");
class CommentService {
    getComments(take, cursor, productId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield commentRepository_1.default.findAll(take, cursor, productId, articleId);
            let nextCursor = null;
            if (comments.length > 0 && comments.length === take) {
                nextCursor = comments[comments.length - 1].id;
            }
            return { comments, nextCursor };
        });
    }
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentRepository_1.default.findById(id);
        });
    }
    createComment(userId, content, productId, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((productId && articleId) || (!productId && !articleId)) {
                throw new errorHandler_1.CustomError(400, 'Comment must belong to EITHER a Product OR an Article.');
            }
            if (!content || content.trim() === '') {
                throw new errorHandler_1.CustomError(400, 'Content cannot be empty.');
            }
            // 2. 댓글 생성 (DB 저장)
            const comment = yield commentRepository_1.default.create(content, userId, productId, articleId);
            // 3. 알림 로직 시작
            let notification = null;
            let ownerId;
            let targetName = "";
            // 상품 댓글인 경우
            if (productId) {
                const product = yield commentRepository_1.default.findProductOwner(productId);
                if (product) {
                    ownerId = product.userId; // 상품 주인 ID
                    targetName = product.name;
                }
            }
            // 아티클 댓글인 경우
            else if (articleId) {
                const article = yield commentRepository_1.default.findArticleOwner(articleId);
                if (article) {
                    ownerId = article.userId; // 아티클 주인 ID
                    targetName = article.title;
                }
            }
            // 4. 작성자가 본인이 아닐 경우에만 알림 생성
            // (ownerId가 존재하고, 댓글 쓴 사람(userId)과 다를 때)
            if (ownerId && ownerId !== userId) {
                const message = `작성하신 글 '${targetName}'에 새로운 댓글이 달렸습니다: ${content}`;
                // DB에 알림 저장
                notification = yield commentRepository_1.default.createNotification(ownerId, message);
            }
            // 5. 댓글 정보와 알림 정보(있으면)를 함께 반환
            return { comment, notification };
        });
    }
    updateComment(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (content !== undefined && content.trim() === '') {
                throw new errorHandler_1.CustomError(400, 'Content cannot be empty.');
            }
            return yield commentRepository_1.default.update(id, content);
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentRepository_1.default.delete(id);
        });
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=commentService.js.map