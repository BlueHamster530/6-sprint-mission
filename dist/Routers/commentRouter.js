"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../libs/constants.js");
const catchAsync_js_1 = require("../libs/catchAsync.js");
const auth_js_1 = __importDefault(require("../middlewares/auth.js"));
const commentController_js_1 = require("../controller/commentController.js");
const commentRouter = constants_js_1.EXPRESS.Router();
commentRouter.route('/')
    .get((0, catchAsync_js_1.catchAsync)(commentController_js_1.GetComment))
    .post(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(commentController_js_1.PostComment));
commentRouter.route('/:id')
    .get((0, catchAsync_js_1.catchAsync)(commentController_js_1.GetCommentById))
    .patch(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsyncAll)(auth_js_1.default.verifyProduectAuth, commentController_js_1.PatchCommentById))
    .delete(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsyncAll)(auth_js_1.default.verifyProduectAuth, commentController_js_1.DeleteCommentById));
exports.default = commentRouter;
//# sourceMappingURL=commentRouter.js.map