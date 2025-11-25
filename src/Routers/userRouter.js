import { EXPRESS } from './libs/constants.js';
import catchAsync from './../libs/catchAsync.js';
import { register } from '../controller/userController.js';

const userRouter = EXPRESS.Router();



export default userRouter;