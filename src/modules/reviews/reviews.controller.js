import { ReviewsService } from './reviews.service.js';

export class ReviewsController {
    reviewsService = new ReviewsService();

    createReview = async (req, res, next) => {
        try {
            const { order_id, comment, star } = req.body;
            const createdReview = await this.reviewsService.createReview(
                order_id,
                comment,
                star,
            );
            res.status(201).json({
                data: createdReview,
                message: '리뷰가 완성 되었습니다',
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치 못한 에러입니다.' });
        }
    };

    getReviews = async (req, res, next) => {
        try {
            // const storeId = req.params.storeId;
            const reviews = await this.reviewsService.getReviews();
            res.status(201).json({ data: reviews });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치 못한 에러입니다.' });
        }
    };

    deletedReview = async (req, res, next) => {
        try {
            const { reviewId } = req.params;
            const review = await this.reviewsService.deletedReview(reviewId);
            console.log(reviewId);
            if (!review) {
                res.status(404).json({ message: '삭제할 리뷰가 없습니다' });
            }
            res.status(201).json({ message: '삭제 성공' });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: '예상치 못한 에러입니다.' });
        }
    };
}
