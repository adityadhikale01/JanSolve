export default function calculateHostStats(listings) {
    let totalReviews = 0;
    let totalRating = 0;

    listings.forEach((listing) => {
        listing.reviews.forEach((review) => {
            totalReviews++;
            totalRating += review.rating;
        });
    });

    return {
        totalReviews,
        averageRating:
            totalReviews > 0
                ? Number((totalRating / totalReviews).toFixed(1))
                : 0,
    };
}