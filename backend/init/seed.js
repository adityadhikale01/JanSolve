// import dotenv from "dotenv";
// import bcrypt from "bcryptjs";

// import connectDB from "../config/db.js";

// import Listing from "../features/listings/listingModel.js";
// import User from "../features/user/users.js";
// import Review from "../features/reviews/reviewModel.js";

// import listings from "./data.js";

// dotenv.config();

// await connectDB();

// try {
//     console.log("Deleting old data...");

//     await Review.deleteMany({});
//     await Listing.deleteMany({});
//     await User.deleteMany({});
//     const AdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
//     console.log("Creating demo users...");
//     const admin = await User.create({
//     name: "StayConnect Admin",
//     email: "admin@stayconnect.com",
//     password: AdminPassword,
//     role: "admin",
//     });
//     const hashedPassword = await bcrypt.hash("123456", 10);

//     const host = await User.create({
//         name: "SuperHost StayConnect",
//         email: "superhost@stayconnect.com",
//         password: hashedPassword,
//         role: "host",
//     });

//     const guests = await User.insertMany([
//         {
//             name: "Ramesh Doe",
//             email: "ramesh@example.com",
//             password: hashedPassword,
//         },
//         {
//             name: "Rahul Smith",
//             email: "rahul@example.com",
//             password: hashedPassword,
//         },
//         {
//             name: "Bhaumik Brown",
//             email: "bhuamik@example.com",
//             password: hashedPassword,
//         },
//         {
//             name: "Emily Johnson",
//             email: "emily@example.com",
//             password: hashedPassword,
//         },
//         {
//             name: "Michael Davis",
//             email: "michael@example.com",
//             password: hashedPassword,
//         },
//     ]);

//     console.log("Creating listings...");

//     const listingsWithOwner = listings.map((listing) => ({
//         ...listing,
//         owner: host._id,
//     }));

//     const createdListings = await Listing.insertMany(listingsWithOwner);

//     console.log("Creating reviews...");

//     const comments = [
//     "Amazing stay! The property was exactly as described, clean, spacious, and had all the amenities we needed. The host was very responsive and made the check-in process effortless.",
    
//     "Loved the location. It was close to restaurants, local attractions, and public transport, making it very convenient to explore the city without any hassle.",
    
//     "The apartment was spotless and beautifully maintained. The rooms were comfortable, the beds were cozy, and everything from the kitchen to the bathrooms was well equipped.",
    
//     "Excellent host! They responded to all our questions within minutes and even shared recommendations for nearby cafes and sightseeing spots. Truly a wonderful experience.",
    
//     "We had an amazing family vacation here. The neighborhood felt safe, the property was peaceful, and there was plenty of space for everyone to relax comfortably.",
    
//     "Worth every penny. The photos matched the actual property perfectly, and the quality of the stay exceeded our expectations. I'd happily book it again.",
    
//     "Beautiful property with modern interiors and a stunning view from the balcony. Waking up every morning to such a peaceful atmosphere was the highlight of our trip.",
    
//     "Highly recommended! Everything was organized perfectly, from check-in to check-out. The Wi-Fi was fast, the kitchen was fully stocked, and the overall experience was fantastic.",
    
//     "Great experience overall. The host paid attention to every small detail, including providing fresh towels, toiletries, and helpful local guides for nearby attractions.",
    
//     "Perfect for families. The property had enough rooms, a secure environment for kids, and all the essential facilities needed for a comfortable long stay.",
    
//     "The cleanliness was exceptional. Every corner of the house was spotless, and it felt like staying in a premium hotel rather than a rental property.",
    
//     "One of the best places I've stayed in recently. The peaceful surroundings, comfortable furniture, and thoughtful amenities made the trip truly memorable.",
    
//     "The check-in process was smooth and hassle-free. The instructions were clear, and the host ensured we settled in comfortably without any issues.",
    
//     "Fantastic value for money. The property offered premium amenities at a reasonable price, making it an excellent choice for both short and long stays.",
    
//     "The kitchen was fully equipped with everything needed to cook meals, which made our stay much more convenient and enjoyable.",
    
//     "The balcony view during sunset was breathtaking. It was the perfect place to relax after a day of exploring the city.",
    
//     "The beds were incredibly comfortable, and the rooms were quiet, ensuring a restful night's sleep throughout our stay.",
    
//     "The property was exactly as advertised, with no surprises. Everything worked perfectly, including the air conditioning, Wi-Fi, and kitchen appliances.",
    
//     "Communication with the host was excellent from the moment we booked until checkout. They were polite, professional, and genuinely cared about our experience.",
    
//     "I would absolutely stay here again. The combination of a great location, excellent hospitality, and outstanding cleanliness made this one of my favorite stays."
//     ];

//     for (const listing of createdListings) {
//         const reviewCount = Math.floor(Math.random() * 4) + 2; // 2–5 reviews

//         for (let i = 0; i < reviewCount; i++) {
//             const guest =
//                 guests[Math.floor(Math.random() * guests.length)];

//             const review = await Review.create({
//                 rating: Math.floor(Math.random() * 3) + 3, // 3–5
//                 comment:
//                     comments[
//                         Math.floor(Math.random() * comments.length)
//                     ],
//                 user: guest._id,
//                 listing: listing._id,
//             });

//             listing.reviews.push(review._id);
//         }

//         await listing.save();
//     }

//     console.log("====================================");
//     console.log("Database Seeded Successfully ✅");
//     console.log("====================================");
//     console.log("SuperHost Login");
//     console.log("Email: superhost@stayconnect.com");
//     console.log("Password: 123456");
//     console.log("====================================");

//     process.exit(0);
// } catch (error) {
//     console.error(error);
//     process.exit(1);
// }