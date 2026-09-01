import { useEffect, useState } from "react";
import "./Hero.css";
import SearchBar from "./SearchBar";

const heroImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"

  // "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",

  // "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80",
 
  // "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
        linear-gradient(
          rgba(8,15,30,.58),
          rgba(8,15,30,.38)
        ),
        url(${heroImages[currentImage]})
      `,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="hero-badge">
          Discover Your Perfect Stay
        </span>

        <h1>
          Find Your Next
          <span> Unforgettable Stay</span>
        </h1>

        <p>
          Explore handpicked villas, apartments, cabins and unique
          accommodations across India.
        </p>
        
        <SearchBar />
      </div>

      <div className="scroll-indicator">
        Scroll
      </div>
    </section>
  );
}