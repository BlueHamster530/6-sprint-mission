"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../libs/constants.js");
const catchAsync_js_1 = require("../libs/catchAsync.js");
const auth_js_1 = __importDefault(require("../middlewares/auth.js"));
const productController_js_1 = __importDefault(require("../controller/productController.js"));
const productRouter = constants_js_1.EXPRESS.Router();
const productController = new productController_js_1.default();
productRouter.route('/')
    .get(auth_js_1.default.softVerifyAccessToken, (0, catchAsync_js_1.catchAsync)(productController.GetProduct))
    .post(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(productController.PostProduct));
productRouter.route('/:id')
    .get(auth_js_1.default.softVerifyAccessToken, (0, catchAsync_js_1.catchAsync)(productController.GetProductById))
    .patch(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(productController.PatchProductById))
    .delete(auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(productController.DeleteProductById));
productRouter.post('/:id/like', auth_js_1.default.verifyAccessToken, (0, catchAsync_js_1.catchAsync)(productController.likeProduct));
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map