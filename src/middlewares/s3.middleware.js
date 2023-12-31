import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import s3 from '../../config/s3.config.js';

// 확장자 검사 목록
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif'];

// Multer-S3 설정
const uploadMiddleware = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, callback) => {
            try {
                const date = new Date().toISOString().split('T')[0];
                const randomNumber = Math.random().toString(36).substr(2, 8);

                // 확장자 검사
                const extension = path.extname(file.originalname).toLowerCase();
                if (!allowedExtensions.includes(extension)) {
                    return callback(new Error('Invalid file type'));
                }

                // 파일명 생성
                const filename = date + randomNumber;
                callback(null, filename);
            } catch (error) {
                return callback(new Error('Invalid or expired token'));
            }
        },
        acl: 'public-read-write',
    }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
export default uploadMiddleware;