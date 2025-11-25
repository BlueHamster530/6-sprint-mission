import express from 'express';
import catchAsync from './../libs/catchAsync.js';
import { register } from '../controller/userApi';

const userRouter = express.Router();



export default userRouter;