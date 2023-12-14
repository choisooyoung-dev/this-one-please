import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma/index.js';

export class ReviewsRepository {
    createReview = async (order_id, comment, star) => {
        const createdReview = await prisma.$transaction(
            async (tx) => {
                const review = await tx.reviews.create({
                    data: {
                        order_id: +order_id,
                        comment: comment,
                        star: +star,
                    },
                });
                return review;
            },
            {
                isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
            },
        );
        return createdReview;
    };

    getReviews = async () => {
        // const { store_id } = req.body;
        const reviews = await prisma.reviews.findMany({
            // where: { store_id: +storeId },
            select: {
                id: true,
                order_id: true,
                comment: true,
                star: true,
            },
        });
        return reviews;
    };

    deletedReview = async (id) => {
        await prisma.$transaction(async (tx) => {
            await tx.reviews.delete({
                where: { id: +id },
            });
        });
        return {};
    };
}
