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
const superstruct_1 = require("superstruct");
const structs_1 = require("../structs/structs");
const errorHandler_1 = require("../libs/Handler/errorHandler");
const commentService_1 = require("../services/commentService");
function GetComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { take = '10', cursor, productId, articleId } = req.query;
        const parsedTake = parseInt(take, 10) || 0;
        if (isNaN(parsedTake) || parsedTake <= 0) {
            throw new errorHandler_1.CustomError(400, 'Invalid "take" parameter.');
        }
        const parsedCursor = cursor ? parseInt(cursor, 10) : undefined;
        const parsedProductId = productId ? Number(productId) : undefined;
        const parsedArticleId = articleId ? Number(articleId) : undefined;
        const result = yield commentService_1.commentService.getComments(parsedTake, parsedCursor, parsedProductId, parsedArticleId);
        res.status(200).json(result);
    });
}
function GetCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const parsedId = parseInt(id, 10) || null;
        if (!parsedId)
            throw new errorHandler_1.CustomError(404, "id Not Found");
        const comment = yield commentService_1.commentService.getCommentById(parsedId);
        res.send(comment);
    });
}
function PostComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (0, superstruct_1.assert)(req.body, structs_1.CreateComment);
        const { content, productId, articleId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId)
            throw new errorHandler_1.CustomError(401, 'Unauthorized');
        // 서비스 호출 (userId 추가됨)
        const { comment, notification } = yield commentService_1.commentService.createComment(userId, content, productId, articleId);
        // [알림 발송] 알림이 생성되었다면 소켓으로 전송
        if (notification) {
            const io = req.app.get('io'); // app.js에서 설정한 io 객체 가져오기
            if (io) {
                // 알림 받을 사람(notification.userId)에게만 전송
                io.to(notification.userId).emit('notification', notification);
            }
        }
        // 클라이언트에는 댓글 정보만 주거나, 필요하면 알림 생성 여부도 줄 수 있음
        res.status(201).send(comment);
    });
}
function PatchCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, superstruct_1.assert)(req.body, structs_1.PatchComment);
        const { content } = req.body;
        const { id } = req.params;
        const parsedId = parseInt(id, 10) || null;
        if (!parsedId)
            throw new errorHandler_1.CustomError(404, "id Not Found");
        if (!content)
            throw new errorHandler_1.CustomError(404, "Request body is empty");
        const comment = yield commentService_1.commentService.updateComment(parsedId, content);
        res.send(comment);
    });
}
function DeleteCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const parsedId = parseInt(id, 10) || null;
        if (!parsedId)
            throw new errorHandler_1.CustomError(404, "id Not Found");
        const comment = yield commentService_1.commentService.deleteComment(parsedId);
        res.send(comment);
    });
}
//# sourceMappingURL=commentController.js.map