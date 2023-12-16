import { ReviewsService } from './reviews.service.js';

export class ReviewsController {
    reviewsService = new ReviewsService();

    createReview = async (req, res, next) => {
        try {
            const { order_id, comment, star } = req.body;
            const createdReview = await this.reviewsService.createReview(order_id, comment, star);
            return res.status(201).json({
                success: true,
                data: createdReview,
                message: '리뷰가 완성 되었습니다',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다.',
            });
        }
    };

    getReviews = async (req, res, next) => {
        try {
            // const storeId = req.params.storeId;
            const reviews = await this.reviewsService.getReviews();
            return res.status(201).json({ success: true, data: reviews });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다.',
            });
        }
    };

    deleteReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const review = await this.reviewsService.getReview(reviewId);
            if (!review) {
                return res.status(404).json({
                    success: false,
                    message: '삭제할 리뷰가 없습니다',
                });
            }
            await this.reviewsService.deleteReview(reviewId);
            return res.status(201).json({ success: true, message: '삭제 성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                success: false,
                message: '예상치 못한 에러입니다.',
            });
        }
    };
}
