import "./ListingImageBar.css";

export default function ListingImageBar({ image, title }) {
  return (
    <section className="listing-image-bar-div">
      <img
        src={image}
        alt={title}
        className="listing-image-bar"
      />
    </section>
  );
}