import express from 'express';
import catchAsync from './../libs/catchAsync.js';
import {
    GetComment,
    PostComment,
    GetCommentById,
    PatchCommentById,
    DeleteCommentById
} from '../controller/commentapi.js';

const commentRouter = express.Router();

commentRouter.route('/')
    .get(catchAsync(GetComment))
    .post(catchAsync(PostComment));

commentRouter.route('/:id')
    .get(catchAsync(GetCommentById))
    .patch(catchAsync(PatchCommentById))
    .delete(catchAsync(DeleteCommentById));


export default commentRouter;