import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { ReviewsController } from '../modules/reviews/reviews.controller.js';

const router = express.Router();
const reviewsController = new ReviewsController();

// 리뷰 생성
router.post('/', reviewsController.createReview);

// 리뷰 목록보기
router.get('/', reviewsController.getReviews);

//리뷰 삭제
router.delete('/:reviewId', reviewsController.deleteReview);

export default router;
