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
exports.notificationService = void 0;
const notificationRepository_1 = __importDefault(require("../repositories/notificationRepository"));
const errorHandler_1 = require("../libs/Handler/errorHandler");
class NotificationService {
    getNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield notificationRepository_1.default.findAll(userId);
        });
    }
    getUnreadCount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield notificationRepository_1.default.countUnread(userId);
            return { count };
        });
    }
    readNotification(userId, notificationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield notificationRepository_1.default.findById(notificationId);
            if (!notification) {
                throw new errorHandler_1.CustomError(404, 'Notification not found');
            }
            if (notification.userId !== userId) {
                throw new errorHandler_1.CustomError(403, 'Forbidden: Not your notification');
            }
            if (notification.isRead) {
                return notification;
            }
            return yield notificationRepository_1.default.markAsRead(notificationId);
        });
    }
}
exports.notificationService = new NotificationService();
//# sourceMappingURL=notificationService.js.map