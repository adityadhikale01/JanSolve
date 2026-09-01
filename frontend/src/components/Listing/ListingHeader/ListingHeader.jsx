import "./ListingHeader.css";

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function ListingHeader({
  title,
  rating,
  reviews,
  location,
  country,
}) {
  return (
    <section className="listing-header">

      <div className="listing-header-top">

        <h1 className="listing-title">
          {title}
        </h1>

        <div className="listing-actions">

          <button className="action-btn">
            <IosShareOutlinedIcon fontSize="small" />
            <span>Share</span>
          </button>

          <button className="action-btn">
            <FavoriteBorderOutlinedIcon fontSize="small" />
            <span>Save</span>
          </button>

        </div>

      </div>

      <div className="listing-meta">

        <div className="rating-group">

          <StarRoundedIcon
            className="star-icon"
            fontSize="small"
          />

          <span>{rating}</span>

          <span className="dot">•</span>

          <span className="reviews">
            {reviews} reviews
          </span>

        </div>

        <span className="dot">•</span>

        <div className="location-group">

          <LocationOnOutlinedIcon
            fontSize="small"
            className="location-icon"
          />

          <span>
            {location}, {country}
          </span>

        </div>

      </div>

    </section>
  );
}