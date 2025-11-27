import { EXPRESS } from './../libs/constants.js';
import { catchAsync } from './../libs/catchAsync.js';
import { login, register, refresh } from '../controller/userController.js';
import auth from '../middlewares/auth.js';

const userRouter = EXPRESS.Router();

userRouter.post('/', catchAsync(register));
userRouter.post('/login', catchAsync(login));
userRouter.post('/token/refresh', auth.verifyRefreshToken, catchAsync(refresh));


export default userRouter;