
export const filterLogic=(params,listings)=>{
         let filteredListings = [...listings];
    /* ---------------- Search ---------------- */

    if (params.search) {

        filteredListings = filteredListings.filter((listing) => {

            const value = params.search.toLowerCase();

            return (
                listing.title.toLowerCase().includes(value) ||
                listing.location.toLowerCase().includes(value) ||
                listing.country.toLowerCase().includes(value)
            );

        });

    }

    /* ---------------- Landing Location ---------------- */

    if (params.location) {

        filteredListings = filteredListings.filter((listing) =>
            listing.location
                .toLowerCase()
                .includes(params.location.toLowerCase())
        );

    }

    /* ---------------- Category ---------------- */

    if (params.category) {

        filteredListings = filteredListings.filter(
            (listing) => listing.category === params.category
        );

    }

    /* ---------------- Country ---------------- */

    if (params.country) {

        filteredListings = filteredListings.filter(
            (listing) => listing.country === params.country
        );

    }

    /* ---------------- Guests ---------------- */

    if (params.guests > 0) {

        filteredListings = filteredListings.filter(
            (listing) => listing.maxGuests >= params.guests
        );

    }

    /* ---------------- Price ---------------- */

    if (params.price > 0) {

        filteredListings = filteredListings.filter(
            (listing) => listing.price >= params.price
        );

    }

    /* ---------------- Sorting ---------------- */

    switch (params.sort) {

        case "priceLow":

            filteredListings.sort((a, b) => a.price - b.price);
            break;

        case "priceHigh":

            filteredListings.sort((a, b) => b.price - a.price);
            break;

        case "rating":

            filteredListings.sort((a, b) => b.rating - a.rating);
            break;

        default:
            break;
    }
    return filteredListings;
    }
