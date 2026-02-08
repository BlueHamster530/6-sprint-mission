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
const errorHandler_1 = require("../libs/Handler/errorHandler");
const notificationService_1 = require("../services/notificationService");
class NotificationController {
    constructor() {
        // GET /notifications
        this.GetNotifications = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // 미들웨어에서 userId 가져오기
            if (!userId)
                throw new errorHandler_1.CustomError(401, "Unauthorized");
            const notifications = yield notificationService_1.notificationService.getNotifications(userId);
            res.status(200).send(notifications);
        });
        // GET /notifications/count
        this.GetUnreadCount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId)
                throw new errorHandler_1.CustomError(401, "Unauthorized");
            const result = yield notificationService_1.notificationService.getUnreadCount(userId);
            res.status(200).send(result);
        });
        // PATCH /notifications/:id/read
        this.ReadNotification = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id } = req.params;
            if (!id)
                throw new errorHandler_1.CustomError(400, "Missing notification ID");
            const notificationId = parseInt(id, 10);
            if (!notificationId)
                throw new errorHandler_1.CustomError(400, "Invalid notification ID");
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            if (!userId)
                throw new errorHandler_1.CustomError(401, "Unauthorized");
            const result = yield notificationService_1.notificationService.readNotification(userId, notificationId);
            res.status(200).send(result);
        });
    }
}
exports.default = NotificationController;
//# sourceMappingURL=notificationController.js.map