"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = __importDefault(require("../controller/notificationController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
const controller = new notificationController_1.default();
router.get('/', auth_1.default.softVerifyAccessToken, controller.GetNotifications);
router.get('/count', auth_1.default.softVerifyAccessToken, controller.GetUnreadCount);
router.patch('/:id/read', auth_1.default.verifyAccessToken, controller.ReadNotification);
exports.default = router;
//# sourceMappingURL=notificationRouter.js.map