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
function findAll(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    });
}
function countUnread(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.notification.count({
            where: {
                userId,
                isRead: false,
            },
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.notification.findUnique({
            where: { id },
        });
    });
}
function markAsRead(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return constants_1.prismaClient.notification.update({
            where: { id },
            data: { isRead: true },
        });
    });
}
exports.default = {
    findAll,
    countUnread,
    findById,
    markAsRead,
};
//# sourceMappingURL=notificationRepository.js.map