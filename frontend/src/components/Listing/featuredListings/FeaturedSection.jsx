import { useNavigate } from "react-router-dom";
import "./FeaturedSection.css";

const featuredDestinations = [
    {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
  },
  {
    name: "Manali",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245",
  },
  {
    name: "Munnar",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    name: "Udaipur",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
  },
  {
    name: "Rishikesh",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  },
  {
    name: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
  },
  {
    name: "Kashmir",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d",
  },
];

function FeaturedSection() {
    const navigate = useNavigate();

    function handleDestinationClick(destination) {
        navigate(`/listings?search=${encodeURIComponent(destination)}`);
    }

    return (
        <section className="featured-section">
            <div className="container">

                <div className="section-header">
    <span className="section-tag">✈ Explore India</span>

    <h2>Featured Destinations</h2>

    <p>
        Discover handpicked destinations where unforgettable stays and
        memorable experiences await.
    </p>
</div>

<div className="destinations-grid">
    {featuredDestinations.map((destination) => (
        <article
            key={destination.name}
            className="destination-card"
            onClick={() =>
                navigate(`/listings?search=${destination.name}`)
            }
        >
            <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
            />

            <div className="destination-overlay">

                <span className="destination-badge">
                    Featured
                </span>

                <div className="destination-content">
                    <h3>{destination.name}</h3>

                    <p>
                        Escape. Explore. Stay Connected.
                    </p>
                </div>

            </div>

        </article>
    ))}

                </div>
            </div>
        </section>
    );
}

export default FeaturedSection;