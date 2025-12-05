"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../libs/constants.js");
const catchAsync_js_1 = require("../libs/catchAsync.js");
const auth_js_1 = __importDefault(require("../middlewares/auth.js"));
const articleController_js_1 = __importDefault(require("../controller/articleController.js"));
const articleRouter = constants_js_1.EXPRESS.Router();
const articleController = new articleController_js_1.default();
articleRouter.route('/')
    .get(auth_js_1.default.softVerifyAccessToken, (0, catchAsync_js_1.catchAsync)(articleController.getArticles))
    .post(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(articleController.postArticle));
articleRouter.route('/:id')
    .get(auth_js_1.default.softVerifyAccessToken, (0, catchAsync_js_1.catchAsync)(articleController.getArticleById))
    .patch(auth_js_1.default.verifyAccessToken, auth_js_1.default.verifyArticleAuth, (0, catchAsync_js_1.catchAsync)(articleController.patchArticleById))
    .delete(auth_js_1.default.verifyAccessToken, auth_js_1.default.verifyArticleAuth, (0, catchAsync_js_1.catchAsync)(articleController.deleteArticleById));
articleRouter.post('/:id/like', auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(articleController.likeArticle));
exports.default = articleRouter;
//# sourceMappingURL=articleRouter.js.map