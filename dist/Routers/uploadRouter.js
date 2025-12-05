"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../libs/constants.js");
const catchAsync_js_1 = require("../libs/catchAsync.js");
const multer_1 = __importDefault(require("multer"));
const uploadController_js_1 = require("../controller/uploadController.js");
const uploadRouter = constants_js_1.EXPRESS.Router();
const upload = (0, multer_1.default)({ dest: 'upload/' });
uploadRouter.post('/', upload.single('attachment'), (0, catchAsync_js_1.catchAsync)(uploadController_js_1.UploadSingleImage));
uploadRouter.use('/', constants_js_1.EXPRESS.static('upload'));
exports.default = uploadRouter;
//# sourceMappingURL=uploadRouter.js.map