import { ReviewsRepository } from './reviews.repository.js';

export class ReviewsService {
    reviewsRepository = new ReviewsRepository();

    createReview = async (order_id, comment, star) => {
        const createdReview = await this.reviewsRepository.createReview(order_id, comment, star);
        return {
            id: createdReview.id,
            order_id: createdReview.order_id,
            comment: createdReview.comment,
            star: createdReview.star,
        };
    };

    getReviews = async () => {
        // const { store_id } = req.body;
        const reviews = await this.reviewsRepository.getReviews();
        return reviews;
    };

    getReview = async (id) => {
        const review = await this.reviewsRepository.getReview(id);
        return review;
    };

    deleteReview = async (id) => {
        // const { reviewId } = req.params;
        await this.reviewsRepository.deleteReview(id);
        return {};
    };
}
