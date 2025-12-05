"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterManager = void 0;
const constants_js_1 = require("../libs/constants.js");
const productRouter_js_1 = __importDefault(require("./productRouter.js"));
const articleRouter_js_1 = __importDefault(require("./articleRouter.js"));
const commentRouter_js_1 = __importDefault(require("./commentRouter.js"));
const uploadRouter_js_1 = __importDefault(require("./uploadRouter.js"));
const userRouter_js_1 = __importDefault(require("./userRouter.js"));
exports.RouterManager = constants_js_1.EXPRESS.Router();
exports.RouterManager.use('/products', productRouter_js_1.default);
exports.RouterManager.use('/articles', articleRouter_js_1.default);
exports.RouterManager.use('/comments', commentRouter_js_1.default);
exports.RouterManager.use('/files', uploadRouter_js_1.default);
exports.RouterManager.use('/user', userRouter_js_1.default);
//# sourceMappingURL=routerManager.js.map