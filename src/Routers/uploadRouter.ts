import { EXPRESS } from '../libs/constants';
import { catchAsync } from '../libs/catchAsync';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import {
    UploadSingleImage
} from '../controller/uploadController';

const uploadRouter = EXPRESS.Router();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    })
});

uploadRouter.post('/', upload.single('attachment'),
    catchAsync(UploadSingleImage));

export default uploadRouter;
