import { EXPRESS } from './../libs/constants.js';
import { catchAsync, catchAsyncAll } from './../libs/catchAsync.js';
import auth from './../middlewares/auth.js';
import {
    GetProduct,
    PostProduct,
    GetProductById,
    PatchProductById,
    DeleteProductById
} from '../controller/productController.js';

const productRouter = EXPRESS.Router();



productRouter.route('/')
    .get(catchAsync(GetProduct))
    .post(auth.verifyAccessToken, catchAsync(PostProduct));

productRouter.route('/:id')
    .get(catchAsync(GetProductById))
    .patch(auth.verifyAccessToken, catchAsyncAll(auth.verifyProduectAuth, PatchProductById))
    .delete(auth.verifyAccessToken, catchAsyncAll(auth.verifyProduectAuth, DeleteProductById));

export default productRouter;