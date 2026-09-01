export default function listingReviewsStats(listing) {
    let totalReviews = 0;
    let totalRating = 0;


        listing.reviews.forEach((review) => {
            totalReviews++;
            console.log("review.rating", review.rating);
            totalRating += review.rating;
        });
    
       let  averageRating= totalReviews > 0? Number((totalRating / totalReviews).toFixed(1)): 0;
    return averageRating;
}