import { Form,useNavigation } from "react-router-dom";
import "./ListingForm.css";
import {useState} from "react";

export default function ListingForm({
  listing = {},
  method = "post",
  submitText = "Save Listing",
  
}) {
    const navigation = useNavigation();
    const existingImageUrl = listing.image?.[0]?.url || "";
    const [preview, setPreview] = useState(existingImageUrl);
    function handleFileChange(event) {
     
       const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please select an image.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Image should be less than 5MB.");
        return;
    }

    setPreview(URL.createObjectURL(file));//create a preview of the image
    }

  return (
    <div className="listing-form-wrapper">

      <div className="listing-form-card">

        <div className="listing-form-header">
          <h1>{submitText}</h1>
          <p>
            Fill in the details below to publish or update your property.
          </p>
        </div>

        <Form method={method} encType="multipart/form-data" className="listing-form">

          <div className="form-group">
              <label>Property Title</label>

              <input
                type="text"
                name="title"
                placeholder="Luxury Beach Villa"
                defaultValue={listing.title || ""}
                required
              />
          </div>

          <div className="form-group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                placeholder="Describe your property..."
                defaultValue={listing.description || ""}
                required
              />
          </div>
          <div className="grid-2">

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              defaultValue={listing.category || ""}
              required
            >
              <option value="">Select Category</option>
              <option value="Apartment">🏢 Apartment</option>
              <option value="House">🏠 House</option>
              <option value="Villa">🏡 Villa</option>
              <option value="Cabin">🪵 Cabin</option>
              <option value="Hotel">🏨 Hotel</option>
              <option value="Resort">🌴 Resort</option>
              <option value="Beach">🏖 Beach Stay</option>
              <option value="Farmhouse">🌾 Farmhouse</option>
              <option value="Camping">⛺ Camping</option>
              <option value="Luxury">✨ Luxury</option>
            </select>
          </div>

        </div>
          <div className="grid-2">

            <div className="form-group">
              <label>Price (₹ / Night)</label>

              <input
                type="number"
                name="price"
                defaultValue={listing.price || ""}
                required
              />
            </div>

            <div className="form-group">
              <label>Country</label>

              <input
                type="text"
                name="country"
                defaultValue={listing.country || ""}
                required
              />
            </div>

          </div>

          <div className="grid-2">

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                defaultValue={listing.location || ""}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>

              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp"
                required={!existingImageUrl}
              />
            </div>

          </div>
          <div className="form-group">

  <label>Features</label>

  <div className="features-grid">

    {[
      "WiFi",
      "Air Conditioning",
      "Swimming Pool",
      "Free Parking",
      "Kitchen",
      "TV",
      "Washing Machine",
      "Balcony",
      "Gym",
      "Pet Friendly",
      "Breakfast",
      "Workspace",
    ].map((feature) => (
      <label className="feature-item" key={feature}>

        <input
          type="checkbox"
          name="features"
          value={feature}
          defaultChecked={
            listing.features?.includes(feature)
          }
        />

        <span>{feature}</span>

      </label>
    ))}

  </div>

</div>
          {preview && (
            <div className="preview-box">
              <h2>Preview Image</h2>
              <img
                src={preview}
                alt={preview}
              />
            </div>
          )}

          <button className="submit-btn" type="submit" disabled={navigation.state === "submitting"}>
            {navigation.state === "submitting" ? " Saving Listing ..." : submitText}
            
          </button>

        </Form>

      </div>

    </div>
  );
}
