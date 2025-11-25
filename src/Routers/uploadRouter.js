import express from 'express';
import catchAsync from './../libs/catchAsync.js';
import multer from 'multer';
import {
    UploadSingleImage
} from '../controller/uploadapi.js';

const uploadRouter = express.Router();

const upload = multer({ dest: 'upload/' });

uploadRouter.post('/', upload.single('attachment'),
    catchAsync(UploadSingleImage));

uploadRouter.use('/', express.static('upload'));

export default uploadRouter;
