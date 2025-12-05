"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSingleImage = UploadSingleImage;
function UploadSingleImage(req, res) {
    const { filename } = req.file;
    const path = `files/${filename}`;
    res.json({ path });
}
//# sourceMappingURL=uploadController.js.map